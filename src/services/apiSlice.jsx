import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { message } from "antd";
import { toast } from "sonner";
import { clearSessionStorage } from "../utils/constants";

const baseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL2 || "http://default-url.com";
const refreshTokenUrl = "/auth/refresh-token";

let inactivityTimer;

const debug = true; // Set to `true` to enable debugging logs

const customBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if (debug) console.log("[DEBUG] Preparing headers...");
    const userInformation = sessionStorage.getItem("userInformation")
      ? JSON.parse(sessionStorage.getItem("userInformation") || "{}")
      : null;

    const accessToken = userInformation?.access_token;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
      if (debug) console.log("[DEBUG] Access token added to headers");
    }

    headers.set("Content-Type", "application/json");
    if (debug) console.log("[DEBUG] Headers prepared:", headers);
    return headers;
  },
});

const refreshTokenApi = async () => {
  console.log("[DEBUG] Starting token refresh API call...");

  const userInformation = JSON.parse(
    sessionStorage.getItem("userInformation") || "{}"
  );
  const refreshToken = userInformation?.refresh_token;

  if (!refreshToken) {
    console.warn("[WARN] No refresh token found for scheduled refresh");
    toast.warn("No refresh token found. Please log in again.");
    window.location.href = "/login";
    return null;
  }

  try {
    console.log("[DEBUG] Fetching new tokens...");
    const response = await fetch(baseUrl + refreshTokenUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("Token refresh response:", result);

    if (result.error) {
      console.error("[ERROR] Token refresh API error:", result.error);
      throw new Error(result.error);
    }

    if (result.statusCode === "99") {
      // console.warn("[WARN] Session expired. Redirecting to login...");      // toast.error("Session expired. Please log in again.");
      // clearSessionStorage();
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 3000);
    }

    if (result?.access_token && result?.refresh_token) {
      console.log("[DEBUG] Updating session storage with new tokens...");
      sessionStorage.setItem(
        "userInformation",
        JSON.stringify({
          ...userInformation,
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        })
      );
      console.log("[INFO] Updated tokens saved after scheduled refresh");
      return result;
    }
  } catch (error) {
    console.error("[ERROR] Token refresh API error:", error);
    toast.error("Failed to refresh token. Please try again.");
    throw error;
  }

  console.log("[DEBUG] No tokens were refreshed.");
  return null;
};

export const isUserActive = () => {
  const isActive = !!sessionStorage.getItem("userInformation");
  console.log(`[DEBUG] User is ${isActive ? "active" : "inactive"}`);
  return isActive;
};

export const scheduleTokenRefresh = () => {
  console.log("[INFO] Starting token refresh scheduler...");

  // Create a new interval
  const interval = setInterval(async () => {
    if (!isUserActive()) {
      console.warn("[WARN] User is not logged in. Stopping token refresh.");
      stopTokenRefresh();
      return;
    }

    console.log("[INFO] Executing scheduled token refresh...");
    try {
      await refreshTokenApi(); // Ensure this is awaited
    } catch (error) {
      console.error("[ERROR] Scheduled token refresh error:", error);
    }
  }, 10 * 60 * 1000); // Refresh token every 10 minutes

  console.log("[DEBUG] Token refresh interval started.");
  return interval; // Return the interval ID
};

export const stopTokenRefresh = () => {
  console.log("[INFO] Stopping token refresh scheduler...");
  // clearSessionStorage();
  // setTimeout(() => {
  //   window.location.href = "/login";
  // }, 3000);
};

export const resetInactivityTimer = () => {
  if (inactivityTimer) clearTimeout(inactivityTimer);

  // Mark user as active
  sessionStorage.setItem("isActive", "true");

  inactivityTimer = setTimeout(() => {
    console.warn("[WARN] User inactive for 10 minutes. Stopping token refresh.");
    stopTokenRefresh();
  }, 10 * 60 * 1000);
};

export const startActivityListeners = () => {
  if (debug) console.log("[DEBUG] Starting activity listeners...");
  ["mousemove", "keydown", "click"].forEach((event) =>
    document.addEventListener(event, resetInactivityTimer)
  );
  if (debug) console.log("[DEBUG] Activity listeners started.");
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

      try {
        // Call the refreshTokenApi to get new tokens
        const newTokens = await refreshTokenApi();

        if (newTokens) {
          // Tokens were successfully refreshed
          console.log("Tokens updated after reauthentication:", newTokens); // Debug

          // Retry the original request with the new access token
          result = await customBaseQuery(args, api, extraOptions);
        } else {
          // Token refresh failed (e.g., no refresh token or session expired)
          console.warn("[WARN] Session expired. Redirecting to login...");
          toast.error(
            "You have been inactive on the dashboard for a while, session expired. Please log in again."
          );
          clearSessionStorage();
          // Delay redirection by 3 seconds (3000ms)
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
          return; // Stop further execution
        }
      } catch (error) {
        // Handle errors during token refresh
        console.error("Error during token refresh:", error); // Debug
        toast.error("Failed to refresh token. Logging out...");

        // Clear session storage and redirect to login
        sessionStorage.removeItem("userInformation");
        window.location.href = "/login";
        return; // Stop further execution
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
    getActivityLogs: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/admin/fetch-activity-log`,
        params: { page, limit }
      }),
      // Removed transformResponse to see raw data
      providesTags: ['Activities'],
    }),
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
    updateStaff: builder.mutation({
      query: (requestData) => {
        console.log("Update staff request with data:", requestData); // Debug
        return {
          url: "/admin/update-admin",
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
      invalidatesTags: ["Admin"],
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
      invalidatesTags: ["Admin"],
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
    updatePermissionsByRole: builder.mutation({
      query: (permissionsData) => ({
        url: "/admin/update-permissions-by-role",
        method: "POST",
        body: permissionsData,
      }),
      invalidatesTags: ['Admin'],
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
    updateRequesttoComplete: builder.mutation({
      query: (requestData) => {
        console.log("Update job request with complete:", requestData); // Debug

        return {
          url: "/requests/completed",
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
  useGetActivityLogsQuery,
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
  useUpdateStaffMutation,
  useUpdateUserStatusToSuspendedMutation,
  useUpdateUserStatusToActiveMutation,
  useGetStaffByRoleMutation,
  useUpdatePermissionsByRoleMutation,

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
  useUpdateRequesttoCompleteMutation,
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
