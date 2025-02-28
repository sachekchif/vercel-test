import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook from react-router-dom
import {
  ActivitiesIcon,
  AdminDashboardIcon,
  AllRequestsIcon,
  AllStaffIcon,
  AllUsersIcon,
  DashboardIcon,
  logout,
  LogoutIcon,
  ProfileIcon,
} from "../utils/constants";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const SidebarLink = ({ label, href, icon, isActive }) => {
  const handleClick = () => {
    if (label === "Sign Out") {
      // Clear session storage when clicking "Sign Out"
      logout()
    }
  };

  return (
    <Link
      to={href}
      onClick={handleClick} // Attach event handler
      className={`flex items-center p-2 rounded-lg transition-colors group ${
        isActive
          ? "bg-purple-700 text-white hover:text-white hover:bg-purple-800"
          : "text-gray-900 hover:bg-gray-100 hover:text-purple-800"
      }`}
    >
      <span className="me-1 w-5 h-5">{icon}</span>
      <span className="ms-3 font-medium">{label}</span>
    </Link>
  );
};


 
const Sidebar = () => {
  const location = useLocation(); // Get the current location object

  // Retrieve user information from session storage
  const userInformation = JSON.parse(sessionStorage.getItem("userInformation")) || {};
  const role = userInformation?.profile?.role || "user"; // Default role is 'user'

  // Define menu sections for different roles
  const menuSectionsByRole = {
    user: [
      {
        title: "MENU",
        items: [
          { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
        ],
      },
      {
        title: "APPLICATIONS",
        items: [
          { label: "All Requests", href: "/all-requests", icon: <AllRequestsIcon /> },
        ],
      },
      {
        title: "PROFILE",
        items: [
          { label: "Profile", href: "/profile", icon: <ProfileIcon /> },
          { label: "Sign Out", href: "/login", icon: <LogoutIcon /> },
        ],
      },
    ],
    staff: [
      {
        title: "MENU",
        items: [
          { label: "Admin Dashboard", href: "/admin-dashboard", icon: <AdminDashboardIcon /> },
        ],
      },
      {
        title: "APPLICATIONS",
        items: [
          { label: "All Requests", href: "/ad-all-requests", icon: <AllRequestsIcon /> },
          { label: "All Users", href: "/all_users", icon: <AllUsersIcon /> },
          { label: "All Staff", href: "/all_staff", icon: <AllStaffIcon /> },
        ],
      },
      {
        title: "PROFILE",
        items: [
          { label: "Activities", href: "/activities", icon: <ActivitiesIcon /> },
          { label: "Profile", href: "/profile", icon: <ProfileIcon /> },
          { label: "Sign Out", href: "/login", icon: <LogoutIcon /> },
        ],
      },
    ],
    admin: [
      {
        title: "MENU",
        items: [
          { label: "Admin Dashboard", href: "/admin-dashboard", icon: <AdminDashboardIcon /> },
        ],
      },
      {
        title: "APPLICATIONS",
        items: [
          { label: "All Requests", href: "/ad-all-requests", icon: <AllRequestsIcon /> },
          { label: "All Users", href: "/all-users", icon: <AllUsersIcon /> },
          { label: "All Staff", href: "/all-staff", icon: <AllStaffIcon /> },
          // { label: "All Transactions", href: "/all-transactions", icon: <AllRequestsIcon /> }, // Example icon for transactions
        ],
      },
      {
        title: "PROFILE",
        items: [
          { label: "Activities", href: "/activities", icon: <ActivitiesIcon /> },
          { label: "Profile", href: "/profile", icon: <ProfileIcon /> },
          { label: "Sign Out", href: "/login", icon: <LogoutIcon /> },
        ],
      },
    ],
    super_admin: [
      {
        title: "MENU",
        items: [
          { label: "Admin Dashboard", href: "/admin-dashboard", icon: <AdminDashboardIcon /> },
        ],
      },
      {
        title: "APPLICATIONS",
        items: [
          { label: "All Requests", href: "/ad-all-requests", icon: <AllRequestsIcon /> },
          { label: "All Users", href: "/all-users", icon: <AllUsersIcon /> },
          { label: "All Staff", href: "/all-staff", icon: <AllStaffIcon /> },
          // { label: "All Transactions", href: "/all-transactions", icon: <AllRequestsIcon /> }, // Example icon for transactions
        ],
      },
      {
        title: "PROFILE",
        items: [
          { label: "Activities", href: "/activities", icon: <ActivitiesIcon /> },
          { label: "Profile", href: "/profile", icon: <ProfileIcon /> },
          { label: "Sign Out", href: "/login", icon: <LogoutIcon /> },
        ],
      },
    ],
  };

  // Get the menu sections for the current role
  const menuSections = menuSectionsByRole[role] || menuSectionsByRole.user;

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        {menuSections.map((section, index) => (
          <div key={index} className="border-b border-t py-4">
            <div className="mb-4">
              <label className="text-sm font-semibold text-blue-500">
                {section.title}
              </label>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <SidebarLink
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    isActive={location.pathname === item.href}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
