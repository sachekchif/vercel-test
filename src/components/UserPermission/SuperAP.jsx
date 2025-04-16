import React, { useEffect, useState, useCallback, useRef } from "react";
import SectionLabel from "../Profile/Personal/SectionLabel";
import SuperAdminRoles from "./SuperAdminRoles";
import StaffRoles from "./StaffRoles";
import { 
  useGetStaffByRoleMutation,
  useUpdatePermissionsByRoleMutation,
  useFetchProfileRequestsQuery
} from "../../services/apiSlice";
import { message, Spin } from "antd";

const SuperAP = () => {
  // Get user information from session storage
  const userInformation = JSON.parse(sessionStorage.getItem("userInformation")) || {};
  const role = userInformation?.profile?.role || "guest";

  // State management
  const [permissions, setPermissions] = useState({});
  const [staffPermissions, setStaffPermissions] = useState({});
  const [loading, setLoading] = useState({
    initial: true,
    admin: false,
    staff: false
  });
  const [error, setError] = useState(null);
  const lastFetchTime = useRef(0);
  const fetchTimeout = useRef(null);

  // API hooks
  const [getStaffByRole] = useGetStaffByRoleMutation();
  const [updatePermissions] = useUpdatePermissionsByRoleMutation();
  const { refetch: refetchProfile } = useFetchProfileRequestsQuery();

  // Role information
  const roleInfo = React.useMemo(() => ({
    admin: { 
      title: "Staff Role", 
      subtext: "Responsibilities that a staff carries" 
    },
    super_admin: { 
      title: "Admin & Staff Roles", 
      subtext: "Manage permissions for both admin and staff roles" 
    },
  }), []);

  const { title, subtext } = roleInfo[role] || { 
    title: "Roles", 
    subtext: "Responsibilities for the role" 
  };

  // Fetch permissions data with rate limiting
  const fetchData = useCallback(async () => {
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime.current;

    // Rate limiting: 5 seconds between requests
    if (timeSinceLastFetch < 5000) {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current);
      }

      fetchTimeout.current = setTimeout(() => {
        fetchData();
      }, 5000 - timeSinceLastFetch);
      return;
    }

    if (!role) return;
    
    try {
      setLoading(prev => ({ ...prev, initial: true }));
      setError(null);
      lastFetchTime.current = Date.now();

      if (role === "admin") {
        const result = await getStaffByRole({ role: "staff" }).unwrap();
        if (result?.statusCode === "00") {
          setPermissions(result?.data || {});
        } else {
          throw new Error(result?.statusMessage || "Failed to fetch staff data.");
        }
      } else if (role === "super_admin") {
        const [adminResult, staffResult] = await Promise.all([
          getStaffByRole({ role: "admin" }).unwrap(),
          getStaffByRole({ role: "staff" }).unwrap(),
        ]);
        
        if (adminResult?.statusCode === "00") {
          setStaffPermissions(adminResult?.data || {});
        } else {
          throw new Error(adminResult?.statusMessage || "Failed to fetch admin data.");
        }

        if (staffResult?.statusCode === "00") {
          setPermissions(staffResult?.data || {});
        } else {
          throw new Error(staffResult?.statusMessage || "Failed to fetch staff data.");
        }
      }
    } catch (error) {
      setError(error.message);
      message.error(error.message);
    } finally {
      setLoading(prev => ({ ...prev, initial: false }));
    }
  }, [role, getStaffByRole]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current);
      }
    };
  }, []);

  // Initial fetch on mount and when role changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle permission changes for admin
  const handleAdminPermissionChange = useCallback((permissionKey, newState) => {
    setStaffPermissions(prev => ({
      ...prev,
      [permissionKey]: newState,
    }));
  }, []);

  // Handle permission changes for staff
  const handleStaffPermissionChange = useCallback((permissionKey, newState) => {
    setPermissions(prev => ({
      ...prev,
      [permissionKey]: newState,
    }));
  }, []);

  // Save admin permissions
  const handleSaveAdminChanges = useCallback(async (updatedPermissions) => {
    try {
      setLoading(prev => ({ ...prev, admin: true }));
      message.loading({ 
        content: "Saving admin permissions...", 
        key: 'save-admin-permissions' 
      });
      
      const response = await updatePermissions({
        role: "admin",
        ...updatedPermissions
      }).unwrap();
      
      if (response.statusCode === "00") {
        message.loading({
          content: "Updating admin information across platform...",
          key: 'admin-platform-update',
          duration: 0
        });

        const profileResponse = await refetchProfile();
        
        if (profileResponse?.data?.statusCode === "00") {
          const updatedUserInfo = {
            ...userInformation,
            profile: profileResponse.data.profile
          };
          sessionStorage.setItem("userInformation", JSON.stringify(updatedUserInfo));

          message.success({ 
            content: "Admin permissions saved successfully! Platform updated.", 
            key: 'admin-platform-update', 
            duration: 3 
          });
        } else {
          message.success({ 
            content: "Admin permissions saved successfully!", 
            key: 'admin-platform-update', 
            duration: 3 
          });
        }

        await fetchData();
      } else {
        message.error({
          content: response.statusMessage || "Failed to update admin permissions",
          key: 'save-admin-permissions'
        });
      }
    } catch (error) {
      message.error({
        content: error.data?.statusMessage || "Failed to update admin permissions",
        key: 'save-admin-permissions'
      });
    } finally {
      setLoading(prev => ({ ...prev, admin: false }));
    }
  }, [updatePermissions, fetchData, refetchProfile, userInformation]);

  // Save staff permissions
  const handleSaveStaffChanges = useCallback(async (updatedPermissions) => {
    try {
      setLoading(prev => ({ ...prev, staff: true }));
      message.loading({ 
        content: "Saving staff permissions...", 
        key: 'save-staff-permissions' 
      });
      
      const response = await updatePermissions({
        role: "staff",
        ...updatedPermissions
      }).unwrap();
      
      if (response.statusCode === "00") {
        message.loading({
          content: "Updating staff information across platform...",
          key: 'staff-platform-update',
          duration: 0
        });

        const profileResponse = await refetchProfile();
        
        if (profileResponse?.data?.statusCode === "00") {
          const updatedUserInfo = {
            ...userInformation,
            profile: profileResponse.data.profile
          };
          sessionStorage.setItem("userInformation", JSON.stringify(updatedUserInfo));

          message.success({ 
            content: "Staff permissions saved successfully! Platform updated.", 
            key: 'staff-platform-update', 
            duration: 3 
          });
        } else {
          message.success({ 
            content: "Staff permissions saved successfully!", 
            key: 'staff-platform-update', 
            duration: 3 
          });
        }

        await fetchData();
      } else {
        message.error({
          content: response.statusMessage || "Failed to update staff permissions",
          key: 'save-staff-permissions'
        });
      }
    } catch (error) {
      message.error({
        content: error.data?.statusMessage || "Failed to update staff permissions",
        key: 'save-staff-permissions'
      });
    } finally {
      setLoading(prev => ({ ...prev, staff: false }));
    }
  }, [updatePermissions, fetchData, refetchProfile, userInformation]);

  // Show loading state while initial data is being fetched
  if (loading.initial || loading.admin || loading.staff) {
    return (
      <div className="bg-white p-6 flex flex-col md:flex-row mb-8 h-full min-h-[calc(100vh-200px)]">
        <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
          <SectionLabel title={title} subtext={subtext} />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4 space-y-8 pl-0 md:pl-8 flex items-center justify-center">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 flex flex-col md:flex-row mb-8 h-full min-h-[calc(100vh-200px)]">
      {/* Left sidebar with title */}
      <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
        <SectionLabel title={title} subtext={subtext} />
      </div>
      
      {/* Main content area */}
      <div className="w-full md:w-2/3 lg:w-3/4 space-y-8 pl-0 md:pl-8">
        {error && (
          <div className="text-red-500 bg-red-50 p-4 rounded-lg">
            Error: {error}
          </div>
        )}
        
        {/* Super Admin sees both admin and staff permissions */}
        {role === "super_admin" && (
          <>
            <div className="space-y-4">
              <label className="font-semibold text-lg my-1">Admin</label> 
              <SuperAdminRoles 
                permissions={staffPermissions}
                onPermissionChange={handleAdminPermissionChange}
                onSaveChanges={handleSaveAdminChanges}
                loading={loading.admin}
              />
            </div>
            
            <div className="border-t border-gray-200 my-6"></div>
            
            <div className="space-y-4">
              <label className="font-semibold text-lg my-1">Staff</label> 
              <StaffRoles
                permissions={permissions}
                role="staff"
                onPermissionChange={handleStaffPermissionChange}
                onSaveChanges={handleSaveStaffChanges}
                loading={loading.staff}
              />
            </div>
          </>
        )}
        
        {/* Admin only sees staff permissions */}
        {role === "admin" && (
          <div className="space-y-4">
            <StaffRoles
              permissions={permissions}
              role={role}
              onPermissionChange={handleStaffPermissionChange}
              onSaveChanges={handleSaveStaffChanges}
              loading={loading.staff}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAP;