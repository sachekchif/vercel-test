import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import userImagePlaceholder from "../assets/images/bongis.png";
import logoImage from "../assets/images/oa_logo_wide.png";
import NewRequestModal from "./Requests/NewReqModal";
import { DownOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Menu, Modal } from "antd";
import NewJobRequestModal from "./Requests/NewJobRequestModal";
import { LogoutIcon, useLogout } from "../utils/constants";

const navItems = [
  { title: "Home", href: "/" },
  { title: "All Jobs", href: "/alljobs" },
  { title: "Pricing", href: "/pricing" },
  { title: "About Us", href: "/about" },
  // { title: 'New Request', href: '#', modalTarget: 'new_request', modalToggle: 'new_request' },
];

const LOGIN_URL = "/login";
const SIGN_UP_URL = "/sign-up";

function Navbar() {
  const location = useLocation();
  const logout = useLogout();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
   const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const userInformation = JSON.parse(
      sessionStorage.getItem("userInformation")
    );
    if (userInformation) {
      setUser(userInformation);
    }
    const userProfile = userInformation?.profile;
    setProfile(userProfile); // Set profile data to pass to the modal
    setProfilePic(userProfile?.otherProfileDetails?.[0]?.profilePic);
  }, []);

  const role = profile?.role;
  // console.log("r", role);

  const filteredNavItems =
    role === undefined || role === "user" ? navItems : [];

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const btnClassName = `before:ease relative h-[40px] overflow-hidden ${
    user ? "border border-[#FFFFFF26]" : "border-none"
  } px-8 shadow-[inset_0_7.4px_18.5px_0px_rgba(255,255,255,0.11)] border-white bg-purple-700 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-[40px] before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-purple-600 hover:before:-translate-x-40`;

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleSignOut = () => {
    setShowLogoutModal(true);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "signout") {
      handleSignOut();
    }
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  const NewbtnClassName = `before:ease relative h-[20px] overflow-hidden ${
    user ? "border border-[#FFFFFF26]" : "border-none"
  } px-8 shadow-[inset_0_7.4px_18.5px_0px_rgba(255,255,255,0.11)] hover:!bg-purple-600 hover:!text-white hover:!border-purple-500 border-white bg-purple-700 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-[20px] before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-purple-600 hover:before:-translate-x-40`;

  const profileMenu = (
    <Menu onClick={handleMenuClick} className="divide-y divide-gray-100">
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900">
          {user?.profile?.firstName &&
            user?.profile?.lastName &&
            `${user.profile.firstName
              .charAt(0)
              .toUpperCase()}${user.profile.firstName.slice(1)} 
     ${user.profile.lastName
       .charAt(0)
       .toUpperCase()}${user.profile.lastName.slice(1)}`}
        </span>
        <span className="block text-sm text-gray-500 truncate">
          {user?.profile?.email}
        </span>
        {/* Display the user's role */}
        {(role === "staff" || role === "admin" || role === "super_admin") && (
          <span className="block text-sm text-gray-500">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        )}
      </div>
  
      {/* Conditional Menu Items Based on Role */}
      {role === "staff" || role === "admin" || role === "super_admin" ? (
        <>
          <Menu.Item key="admin-dashboard">
            <Link to="/admin-dashboard">Admin Dashboard</Link>
          </Menu.Item>
          {/* Show "Admin Requests" for super_admin and "Pending on Me" for others */}
          {role === "super_admin" ? (
            <Menu.Item key="admin-requests">
              <Link to="/ad-all-requests">Admin Requests</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="pending-on-me">
              <Link to="/pending-requests">Pending on Me</Link>
            </Menu.Item>
          )}
          <Menu.Item key="profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="signout">Sign out</Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="requests">
            <Link to="/all-requests">My Requests</Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="signout">Sign out</Menu.Item>
        </>
      )}
    </Menu>
  );
  return (
    <nav className="bg-white border-b border-gray-100 fixed top-0 z-50 w-full px-8">
      <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto py-4">
        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setNavOpen(!isNavOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logoImage} className="h-6 md:h-8 mr-2" alt="Logo" />
        </Link>

        {/* User and New Request Buttons */}
        <div className="flex items-center md:order-2 gap-4">
          {user ? (
            role === "user" ? (
              <>
                <Button
                  className={`text-xs px-4 h-[16px] md:h-[30px] md:px-4 ${NewbtnClassName}`}
                  onClick={openModal}
                  icon={<PlusOutlined />}
                >
                  New Request
                </Button>
                <NewJobRequestModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  profile={profile}
                />
                <Dropdown overlay={profileMenu} trigger={["click"]}>
                  <Button className="p-0 rounded-full hover:!border-purple-800">
                    <Avatar
                      size={30}
                      src={profilePic}
                      icon={!profilePic && <UserOutlined />} // ✅ Show icon if no valid image
                    />
                  </Button>
                </Dropdown>
              </>
            ) : (
              <>
                {/* <Button
                  className={`text-xs px-4 h-[16px] md:h-[30px] md:px-4 ${NewbtnClassName}`}
                  onClick={openModal}
                  icon={<PlusOutlined />}
                >
                  New Request
                </Button>
                <NewJobRequestModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  profile={profile}
                /> */}
                <Dropdown overlay={profileMenu} trigger={["click"]}>
                  <Button className="p-0 rounded-full hover:!border-purple-800">
                    <Avatar
                      size={30}
                      src={profilePic}
                      icon={!profilePic && <UserOutlined />} // ✅ Show icon if no valid image
                    />
                  </Button>
                </Dropdown>
              </>
            )
          ) : (
            <>
              <Link
                to={LOGIN_URL}
                onClick={() => logout()}
                className="hidden lg:flex"
              >
                <button className="bg-white text-purple-700 h-[38px] lg:px-8 border border-purple-700 hover:border-purple-800">
                  Login
                </button>
              </Link>
              <Link to={SIGN_UP_URL}>
                <button
                  className={`${btnClassName} text-sm px-4 h-[36px] md:h-[40px] md:px-8`}
                >
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Navigation Menu */}
        <div
          className={`items-center justify-between ${
            isNavOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
            {filteredNavItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    location.pathname === item.href ||
                    (item.href === "/alljobs" && location.pathname.startsWith("/alljobs"))
                      ? "text-blue-700 font-bold"
                      : "text-gray-900"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
    </nav>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Navbar;