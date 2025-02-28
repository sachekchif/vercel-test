import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { message } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";
import { logout } from "../utils/constants";

const baseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL2;
const refreshTokenUrl = "/auth/refresh-token";

let refreshInterval;
let inactivityTimer;

export const isUserActive = () => {
  console;
  return !!sessionStorage.getItem("userInformation");
};
// Custom base query with token refresh logic
const customBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    console.log("Preparing headers..."); // Debug
    const userInformation = sessionStorage.getItem("userInformation")
      ? JSON.parse(sessionStorage.getItem("userInformation") || "{}")
      : null;

    const accessToken = userInformation?.access_token;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
      console.log("Access token added to headers"); // Debug
    }

    headers.set("Content-Type", "application/json");
    console.log("Headers prepared:", headers); // Debug
    return headers;
  },
});

export const scheduleTokenRefresh = () => {
  console.log("Starting token refresh scheduler...");

  if (refreshInterval) return; // Prevent multiple intervals

  refreshInterval = setInterval(async () => {
    if (!isUserActive()) {
      console.warn("User is not logged in. Stopping token refresh.");
      stopTokenRefresh();
      return;
    }

    console.log("Executing scheduled token refresh...");
    const userInformation = JSON.parse(
      sessionStorage.getItem("userInformation") || "{}"
    );
    const refreshToken = userInformation?.refresh_token;

    if (!refreshToken) {
      console.warn("No refresh token found for scheduled refresh");
      return;
    }

    try {
      const response = await fetch(baseUrl + refreshTokenUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Token refresh response:", data);

      if (data.access_token && data.refresh_token) {
        sessionStorage.setItem(
          "userInformation",
          JSON.stringify({
            ...userInformation,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          })
        );
        console.log("Updated tokens saved after scheduled refresh");
      }
    } catch (error) {
      console.error("Scheduled token refresh error:", error);
    }
  }, 10 * 60 * 1000); // Refresh token every 13 minutes
};

 const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
    console.warn("Token refresh stopped due to inactivity.");
  }

  // Show Ant Design error message
  message.error("Inactive for too long. Logging out...", 2); // 2-second duration

  // Set a timeout before logging out
  // setTimeout(() => {
  //   logout();

  //   // Redirect to login page
  //   window.location.href = "/login";
  // }, 2000); // 2-second delay before logout
};

export const resetInactivityTimer = () => {
  console.log("User is active. Resetting inactivity timer...");
  if (inactivityTimer) clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    console.warn("User inactive for 10 minutes. Stopping token refresh.");
    stopTokenRefresh();
  }, 10 * 60 * 1000); // Stop token refresh after 10 minutes of inactivity
};

// Detect user activity and reset inactivity timer
export const startActivityListeners = () => {
  ["mousemove", "keydown", "click"].forEach((event) =>
    document.addEventListener(event, resetInactivityTimer)
  );
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log("Executing query:", args); // Debug
  let result = await customBaseQuery(args, api, extraOptions);

  if (result.error) {
    console.warn("Query error detected:", result.error); // Debug
    if (result.error.status === "FETCH_ERROR") {
      // Handle network error with a toast notification
      toast.error("Network error! Please check your internet connection.");
      return; // Stop further execution
    }

    if (result.error.status === 401) {
      console.log("Unauthorized error detected, attempting token refresh"); // Debug
      const userInformation = sessionStorage.getItem("userInformation")
        ? JSON.parse(sessionStorage.getItem("userInformation") || "{}")
        : null;

      const refreshToken = userInformation?.refresh_token;

      if (!refreshToken) {
        // No refresh token found, log out
        toast.error("Session expired. Logging out...");

        // Clear session storage
        // Set a timeout before logging out
        // setTimeout(() => {
        //   logout();

        //   // Redirect to login page
        //   window.location.href = "/login";
        // }, 2000); // 2-second delay before logout
        return; // Stop further execution
      }

      if (refreshToken) {
        const refreshResult = await customBaseQuery(
          {
            url: refreshTokenUrl,
            method: "GET",
            headers: { Authorization: `Bearer ${refreshToken}` },
          },
          api,
          extraOptions
        );

        console.log("Token refresh result:", refreshResult); // Debug

        if (refreshResult.data) {
          // const refreshData = JSON.parse(refreshResult.data);

          if (
            refreshResult.data.statusCode === "99" ||
            refreshResult.statusCode === "99"
          ) {
            // Refresh token expired, log out
            toast.error("Session expired. Logging out...");

            // Clear session storage
            // Set a timeout before logging out
            // setTimeout(() => {
            //   logout();

            //   // Redirect to login page
            //   window.location.href = "/login";
            // }, 2000); // 2-second delay before logout
            return; // Stop further execution
          }
          const { access_token, refresh_token } = refreshResult.data;

          const updatedUserInformation = {
            ...userInformation,
            access_token,
            refresh_token,
          };

          sessionStorage.setItem(
            "userInformation",
            JSON.stringify(updatedUserInformation)
          );
          console.log("Tokens updated after reauthentication"); // Debug

          result = await customBaseQuery(args, api, extraOptions);
        }
      }
    }
  }

  console.log("Query result:", result); // Debug
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Posts",
    "Profile",
    "Users",
    "Jobs",
    "Plans",
    "Subscriptions",
    "Admin",
  ],
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: ({ limit = 10 }) => {
        console.log("Fetching posts with limit:", limit); // Debug
        return `/admin/posts?limit=${limit}`;
      },
      providesTags: ["Posts"],
    }),
    fetchPostById: builder.query({
      query: (postId) => {
        console.log("Fetching post by ID:", postId); // Debug
        return `/admin/posts/${postId}`;
      },
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (formData) => {
        console.log("Creating post with data:", formData); // Debug
        return {
          url: "/admin/posts",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: ({ postId, formData }) => {
        console.log(`Updating post ID ${postId} with data:`, formData); // Debug
        return {
          url: `/admin/posts/${postId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (postId) => {
        console.log("Deleting post ID:", postId); // Debug
        return {
          url: `/admin/posts/${postId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Posts"],
    }),

    // Auth
    register: builder.mutation({
      query: (userData) => {
        console.log("Registering user with data:", userData); // Debug
        return {
          url: "/auth/register",
          method: "POST",
          body: userData,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (credentials) => {
        console.log("Logging in with credentials:", credentials); // Debug
        return {
          url: "/auth/login",
          method: "POST",
          body: credentials,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Login successful:", data); // Debug
          if (data?.access_token) {
            sessionStorage.setItem(
              "userInformation",
              JSON.stringify({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
              })
            );
          }
        } catch (error) {
          console.error("Login failed:", error); // Debug
        }
      },
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: (credentials) => {
        console.log("changes in with credentials:", credentials); // Debug
        return {
          url: "/auth/change-password",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => {
        console.log("Requesting password reset for email:", email); // Debug
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: { email },
        };
      },
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation({
      query: ({ token, email, newPassword }) => {
        console.log("Resetting password for email:", email);
        console.log("Resetting password for email:", token);
        console.log("Resetting password for email:", newPassword); // Debug
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: { token, email, newPassword },
        };
      },
      invalidatesTags: ["Auth"],
    }),
    resendEmail: builder.mutation({
      query: ({ email }) => {
        console.log("Resending email for:", email); // Debug
        return {
          url: "/auth/resend-email",
          method: "POST",
          body: { email },
        };
      },
      invalidatesTags: ["Auth"],
    }),
    fetchUserById: builder.query({
      query: ({ userId }) => {
        console.log("Fetching user by ID:", { userId }); // Debug
        return {
          url: "/admin/fetch-user-by-id",
          method: "POST",
          body: { userId },
        };
      },
      providesTags: ["Users"],
    }),

    // Jobs
    fetchAllJobs: builder.query({
      query: () => {
        console.log("Fetching all jobs..."); // Debug
        return { url: "/jobs/fetch-all-jobs", method: "GET" };
      },
      providesTags: ["Jobs"],
    }),

    fetchFilteredJobs: builder.mutation({
      query: (body) => {
        console.log("Fetching all jobs...", body); // Debug
        return {
          url: "/jobs/fetch-all-jobs-by-title",
          method: "Post",
          body: body,
        };
      },
      providesTags: ["Jobs"],
    }),

    // Admin
    createStaffRequest: builder.mutation({
      query: (requestData) => {
        console.log("Creating job request with data:", requestData); // Debug

        return {
          url: "/admin/create-admin",
          method: "POST",
          body: requestData,
        };
      },
      invalidatesTags: ["Admin"],
    }),

    updateUserStatusToSuspended: builder.mutation({
      query: ({ userId }) => {
        console.log("Updating user status to suspended:", { userId }); // Debug
        return {
          url: "/admin/update-user-status-to-suspended",
          method: "POST",
          body: { userId },
        };
      },
      invalidatesTags: ["Admin"], // Invalidate the Users cache to refresh the data
    }),
    updateUserStatusToActive: builder.mutation({
      query: ({ userId }) => {
        console.log("Updating user status to ative:", { userId }); // Debug
        return {
          url: "/admin/update-user-status-to-active",
          method: "POST",
          body: { userId },
        };
      },
      invalidatesTags: ["Admin"], // Invalidate the Users cache to refresh the data
    }),
    getStaffByRole: builder.mutation({
      query: ({ role }) => {
        console.log("staff staff role", { role }); // Debug
        return {
          url: "/admin/fetch-permissions-by-role",
          method: "POST",
          body: { role },
        };
      },
      invalidatesTags: ["Admin"], // Invalidate the Users cache to refresh the data
    }),

    // Strip
    fetchPlans: builder.query({
      query: () => {
        console.log("Fetching payment plans..."); // Debug log
        return {
          url: "/payments/fetch-plans",
          method: "GET",
        };
      },
      providesTags: ["Plans"],
    }),
    cancelSubscription: builder.query({
      query: () => {
        console.log("Canceling subscription..."); // Debug
        return {
          url: "/payments/cancel-subscription",
          method: "GET", // GET request for canceling the subscription
        };
      },
      invalidatesTags: ["Subscriptions"], // Invalidate the subscriptions cache
    }),

    subscribe: builder.mutation({
      query: (subscriptionData) => {
        console.log("Subscribing with data:", subscriptionData); // Debug log
        return {
          url: "/payments/subscribe",
          method: "POST",
          body: subscriptionData,
        };
      },
      invalidatesTags: ["Subscriptions"], // Invalidate cache for subscriptions
    }),

    // Profile
    updateProfile: builder.mutation({
      query: (formData) => {
        console.log("Updating profile with data:", formData); // Debug
        return {
          url: "/profile/update-profile",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),
    deactivateProfile: builder.query({
      query: () => {
        console.log("Deactivating profile..."); // Debug log
        return {
          url: "/profile/deactivate-profile",
          method: "GET",
        };
      },
      providesTags: ["Profile"],
    }),

    // Requests
    createRequest: builder.mutation({
      query: (requestData) => {
        console.log("Creating job request with data:", requestData); // Debug

        return {
          url: "/requests/create-request",
          method: "POST",
          body: requestData,
        };
      },
      invalidatesTags: ["Jobs"],
    }),
    updateRequestInReview: builder.mutation({
      query: (requestData) => {
        console.log("Update job request to in review with data:", requestData); // Debug

        return {
          url: "/requests/in-review",
          method: "POST",
          body: requestData,
        };
      },
      invalidatesTags: ["Jobs"],
    }),
    updateRequest: builder.mutation({
      query: (requestData) => {
        console.log("Update job request with data:", requestData); // Debug

        return {
          url: "/requests/reviewed",
          method: "POST",
          body: requestData,
        };
      },
      invalidatesTags: ["Jobs"],
    }),
    fetchAllRequests: builder.query({
      query: ({ dateTo, dateFrom, status }) => {
        console.log("Fetching all requests with filters:", {
          dateTo,
          dateFrom,
          status,
        }); // Debug
        return {
          url: "/requests/fetch-all-requests",
          method: "POST",
          body: { dateTo, dateFrom, status },
        };
      },
      providesTags: ["Jobs"],
    }),

    fetchRequestById: builder.query({
      query: ({ id }) => {
        console.log("fetching for this Id", id); // Debug

        return {
          url: "/requests/fetch-request-by-id",
          method: "POST",
          body: {
            requestId: id, // Correct format: wrapping the id in requestId key
          },
        };
      },
      invalidatesTags: ["Jobs"],
    }),

    fetchProfileRequests: builder.query({
      query: () => {
        console.log("Fetching profile requests"); // Debug
        return { url: "/auth/profile", method: "GET" };
      },
      providesTags: ["Profile"],
    }),
    fetchAllUsers: builder.query({
      query: () => {
        console.log("Fetching all users"); // Debug
        return { url: "/admin/fetch-all-users", method: "GET" };
      },
      providesTags: ["Users"],
    }),
    fetchAdminRoles: builder.query({
      query: () => {
        console.log("Fetching admin roles"); // Debug
        return { url: "/admin/get-admin-roles", method: "GET" };
      },
      providesTags: ["Users"],
    }),
    fetchAllStaff: builder.query({
      query: () => {
        console.log("Fetching all staff"); // Debug
        return { url: "/admin/fetch-all-staff", method: "GET" };
      },
      providesTags: ["Users"],
    }),
    fetchJobRequests: builder.query({
      query: () => {
        console.log("Fetching all job requests"); // Debug
        return { url: "/jobs/fetch-all-requests", method: "GET" };
      },
      providesTags: ["Jobs"],
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useFetchPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,

  // Auth
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendEmailMutation,
  useChangePasswordMutation,
  useFetchUserByIdQuery,

  // Jobs
  useFetchAllJobsQuery,
  useFetchFilteredJobsMutation,

  // Admin
  useCreateStaffRequestMutation,
  useUpdateUserStatusToSuspendedMutation,
  useUpdateUserStatusToActiveMutation,
  useGetStaffByRoleMutation,

  // Profile
  useUpdateProfileMutation,
  useLazyDeactivateProfileQuery,

  // strip
  useFetchPlansQuery,
  useSubscribeMutation,
  useLazyCancelSubscriptionQuery,

  // requests
  // post
  useCreateRequestMutation,
  useUpdateRequestInReviewMutation,
  useUpdateRequestMutation,
  useFetchAllRequestsQuery,
  useFetchRequestByIdQuery,

  // Get
  useFetchProfileRequestsQuery,
  useFetchAllUsersQuery,
  useFetchAdminRolesQuery,
  useFetchAllStaffQuery,
  useFetchJobRequestsQuery,
} = apiSlice;

export default apiSlice;
