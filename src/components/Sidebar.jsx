import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ActivitiesIcon,
  AdminDashboardIcon,
  AllRequestsIcon,
  AllStaffIcon,
  AllUsersIcon,
  DashboardIcon,
  LogoutIcon,
  ProfileIcon,
  useLogout,
} from "../utils/constants";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const SidebarLink = ({ label, href, icon, isActive, onClick }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
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
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logout = useLogout();

  const userInformation =
    JSON.parse(sessionStorage.getItem("userInformation")) || {};
  const role = userInformation?.profile?.role || "user";

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
          {
            label: "All Requests",
            href: "/all-requests",
            icon: <AllRequestsIcon />,
          },
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
          {
            label: "Admin Dashboard",
            href: "/admin-dashboard",
            icon: <AdminDashboardIcon />,
          },
        ],
      },
      {
        title: "APPLICATIONS",
        items: [
          {
            label: "All Requests",
            href: "/ad-all-requests",
            icon: <AllRequestsIcon />,
          },
          {
            label: "Pending On You",
            href: "/pending-requests",
            icon: <AllRequestsIcon />,
          },
          { label: "All Users", href: "/all-users", icon: <AllUsersIcon /> },
          { label: "All Staff", href: "/all-staff", icon: <AllStaffIcon /> },
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
    admin: [
      {
        title: "MENU",
        items: [
          {
            label: "Admin Dashboard",
            href: "/admin-dashboard",
            icon: <AdminDashboardIcon />,
          },
        ],
      },
      {
        title: "APPLICATIONS",
        items: [
          {
            label: "All Requests",
            href: "/ad-all-requests",
            icon: <AllRequestsIcon />,
          },
          {
            label: "Pending On You",
            href: "/pending-requests",
            icon: <AllRequestsIcon />,
          },
          { label: "All Users", href: "/all-users", icon: <AllUsersIcon /> },
          { label: "All Staff", href: "/all-staff", icon: <AllStaffIcon /> },
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
    super_admin: [
      {
        title: "MENU",
        items: [
          {
            label: "Admin Dashboard",
            href: "/admin-dashboard",
            icon: <AdminDashboardIcon />,
          },
        ],
      },
      {
        title: "APPLICATIONS",
        items: [
          {
            label: "All Requests",
            href: "/ad-all-requests",
            icon: <AllRequestsIcon />,
          },
          { label: "All Users", href: "/all-users", icon: <AllUsersIcon /> },
          { label: "All Staff", href: "/all-staff", icon: <AllStaffIcon /> },
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
  };

  // Get the menu sections for the current role
  const menuSections = menuSectionsByRole[role] || menuSectionsByRole.user;

  const handleSignOut = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
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
                      href={item.label === "Sign Out" ? "#" : item.href}
                      icon={item.icon}
                      isActive={location.pathname === item.href}
                      onClick={
                        item.label === "Sign Out" ? handleSignOut : undefined
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
        open={showLogoutModal}
        onCancel={cancelLogout}
        footer={null}
        centered
        className="text-center"
      >
        <div className="p-6 flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <span className="me-1 w-10 h-10 p-2.5 bg-purple-100 rounded-full"><LogoutIcon /></span>
          </div>
          <h3 className="text-xl text-center font-semibold mb-2">Confirm Sign Out</h3>
          <p className="text-gray-600 mb-6 text-center">
            Are you sure you want to sign out of your account?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={cancelLogout}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-6 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;