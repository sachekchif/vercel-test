import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/dashboard/DashboardCard.jsx";
import DropdownMenu from "../../components/DropdownMenu.jsx";
import CustomButton from "../../components/CustomButton.jsx";
import {
  DatePicker,
  Table,
  Select,
  Spin,
  Input,
  Menu,
  Dropdown,
  message,
  Modal,
} from "antd";
import { BulletList } from "react-content-loader";
import { itemRender, onShowSizeChange } from "../../components/Pagination.jsx";
import {
  canBlockUser,
  canRestoreUser,
  CompletedIcon,
  DeleteIcon,
  getCurrentDate,
  getDate,
  PendingIcon,
  TotalCardIcon,
  ViewIcon,
} from "../../utils/constants.jsx";
import NewRequestButton from "../../components/Requests/NewRequest.jsx";
import {
  useFetchAllUsersQuery,
  useFetchRequestByIdQuery,
  useFetchUserByIdQuery,
  useUpdateUserStatusToActiveMutation,
  useUpdateUserStatusToSuspendedMutation,
} from "../../services/apiSlice.jsx";
import dayjs from "dayjs";
import AccountDetailsDrawer from "../../components/Requests/AccountDetailsDrawer.jsx";
import {
  DownOutlined,
  RollbackOutlined,
  StopOutlined,
} from "@ant-design/icons";
import UserDetailDrawer from "../../components/Requests/UserDetailsDrawer.jsx";

const { RangePicker } = DatePicker;
const { Option } = Select;

const AllUsers = () => {
  const [dateRange, setDateRange] = useState([]);
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUserStatusToSuspended, { isLoading: loadingSuspended }] =
    useUpdateUserStatusToSuspendedMutation();
  const [updateUserStatusToActivate, { isLoading: loadingActive }] =
    useUpdateUserStatusToActiveMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const userInformation = JSON.parse(sessionStorage.getItem("userInformation")) || {};
  const initialPermissions = userInformation?.profile?.permissions || {};

  // Fetch user data
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useFetchUserByIdQuery(
    { userId: viewId },
    { skip: !viewId } // Skip query if viewId is not set
  );
  const { data: usersData, isLoading: usersLoading, refetch: usersRefetch, } = useFetchAllUsersQuery();

  // Handle Date Range Change
  const handleDateChange = (dates, dateStrings) => {
    setDateRange(dates);
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  // Handle Status Change
  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const refetchAllRequests = async () => {
    if (
      usersLoading
    ) {
      return; // Skip refetch if data is already being fetched
    }

    try {
      await Promise.all([
        usersRefetch(),
      ]);
      console.log("All requests refetched successfully!");
    } catch (error) {
      console.error("Error refetching requests:", error);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval); // Pause auto-refresh
      } else {
        interval = setInterval(() => {
          refetchAllRequests(); // Resume auto-refresh
        }, 3000);
      }
    };

    let interval = setInterval(() => {
      refetchAllRequests(); // Refetch data every X seconds
    }, 30000); // 30 seconds

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [usersRefetch]);

  // Filtering Users
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(usersData?.data)) return [];

    let filtered = [...usersData.data];

    // Filter by Date Range
    if (startDate && endDate) {
      filtered = filtered.filter((user) => {
        const userDate = user?.logdate
          ? dayjs(user.logdate).format("YYYY-MM-DD")
          : null;
        return userDate && userDate >= startDate && userDate <= endDate;
      });
    }

    // Filter by Status
    if (status !== "All") {
      filtered = filtered.filter((user) => user.status === status);
    }

    // Filter by Search Term (firstName, case insensitive)
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.firstName?.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by logdate (newest first)
    return filtered.sort(
      (a, b) => new Date(b?.logdate || 0) - new Date(a?.logdate || 0)
    );
  }, [usersData, startDate, endDate, status, searchTerm]);

  console.log("Filtered Users:", filteredUsers);
  // Count Users by Status
  const activeUsersCount = usersData?.data?.filter(
    (user) => user.status === "active"
  ).length;
  const pendingUserCount = filteredUsers.filter(
    (user) => user.status === "pending"
  ).length;

  const showDrawer = (id) => {
    setViewId(id);
    setDrawerIsVisible(true);
  };

  const closeDrawer = () => {
    setDrawerIsVisible(false);
    setViewId(null);
  };

  const handleButtonClick = (id) => {
    const user = filteredUsers?.find((user) => user?.id === id);
    console.log(user);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    } else {
      message.error("User not found!");
    }
  };
  console.log("usr.setSelectedUser", selectedUser);

  const handleConfirm = async () => {
    if (!selectedUser) {
      message.error("No user selected!");
      return;
    }

    try {
      const newStatus =
        selectedUser.status === "active" ? "suspended" : "active";

      let response;

      if (newStatus === "suspended") {
        // Call API to suspend the user
        response = await updateUserStatusToSuspended({
          userId: selectedUser.id,
        }).unwrap();

        
        if (response.statusCode !== "00") {
          message.error(response.statusMessage || "Failed to suspend user.");
          return; // Exit the function to prevent further execution
        }
      } else if (newStatus === "active") {
        // Call API to reactivate the user
        response = await updateUserStatusToActivate({
          userId: selectedUser.id,
        }).unwrap();

        // Check if the statusCode is not "00"
        if (response.statusCode !== "00") {
          message.error(response.statusMessage || "Failed to reactivate user.");
          return; // Exit the function to prevent further execution
        }
      }

      // Show success message
      message.success(response.statusMessage || "Status updated successfully!");
    } catch (error) {
      console.error("Failed to update user status:", error);
      message.error(
        error.data?.statusMessage || "Failed to update user status."
      );
    } finally {
      setIsModalOpen(false);
      setSelectedUser(null);
    }
  };

  const confirmLoading =
    selectedUser?.status === "active" ? loadingSuspended : loadingActive;

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const dashboardData = [
    {
      label: "Total Users",
      description: "All users on Outsource Apply",
      value: usersData?.data?.length || 0,
      link: "all-requests",
      color: "",
      icon: <TotalCardIcon />,
      loading: usersLoading,
    },
    {
      label: "Active Users",
      description: "Active users on Outsource Apply",
      value: activeUsersCount,
      link: "all-users.html",
      color: "text-green-500",
      icon: <PendingIcon />,
      loading: usersLoading,
    },
    {
      label: "Pending Requests",
      description: "Blocked users on Outsource Apply",
      value: pendingUserCount,
      link: "all_staff.html",
      color: "text-red-500",
      icon: <CompletedIcon />,
      loading: usersLoading,
    },
  ];
  const columns = [
    {
      title: "FULL NAME",
      dataIndex: "jobTitle",
      render: (text, record) => (
        <div className="flex-column">
          <div className="mb-1">
            {record.firstName} {record.lastName}
          </div>
          <div className="text-body-secondary">{record.role}</div>
        </div>
      ),
    },

    {
      title: "EMAIL / PHONE",
      dataIndex: "companyName",
      render: (text, record, index) => (
        <div className="flex-column">
          <div className="mb-1">{record.email}</div>
          <div className="text-body-secondary">{record.phone}</div>
        </div>
      ),
    },
    {
      title: "DATE JOINED",
      dataIndex: "logdate",
      render: (text, record) => <p className="table-avatar">{getDate(text)}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <label
          className={
            text === "REJECTED"
              ? "bg-red-100 text-red-600 text-xs font-medium px-4 py-0.5 rounded-full border border-red-500"
              : text === "PENDING"
              ? "bg-orange-100 text-red-500 text-xs font-medium px-4 py-0.5 rounded-full border border-red-400"
              : text === "active"
              ? "bg-green-100 text-green-800 text-xs font-medium px-4 py-0.5 rounded-full border border-green-500"
              : text === "IN REVIEW"
              ? "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
              : "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
          }
        >
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </label>
      ),
    },
    {
      title: "Action",
      render: (text, record) => {
        const isDisabled = !canBlockUser && !canRestoreUser; // Disable if both are false
        // console.log("Disabled", isDisabled);
        console.log("Disabledtt", canBlockUser);
        console.log("Disabledttgg", canRestoreUser);
        const buttonStyles = isDisabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600"; // Change color if disabled
    
        return (
          <div className="flex items-center justify-start">
            <button
              onClick={() => showDrawer(record.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2"
            >
              <ViewIcon />
            </button>
    
            <button
              className={`${buttonStyles} text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2`}
              onClick={() => handleButtonClick(record.id)}
              disabled={isDisabled} // Disable button
            >
              {record.status === "active" ? <StopOutlined /> : <RollbackOutlined />}
            </button>
          </div>
        );
      },
    }
    
  ];

  const menu = (
    <Menu
      className="bg-black text-white border border-gray-700 rounded-lg"
      onClick={({ key }) => handleStatusChange(key)}
    >
      {["All", "active", "pending", "inactive"].map((item) => (
        <Menu.Item key={item} className="hover:bg-gray-800 text-white">
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="flex">
      <Navbar />
      <Sidebar />
      <div className="px-8 py-8 sm:ml-64 bg-gray-50 w-full h-full">
        <main className="rounded-lg mt-14 mb-12l">
          <div className="mb-12">
            <h1 className="mb-1 text-xl font-bold">ALL OUTSOURCE-APPLY USERS</h1>
          </div>

          <div className="w-full rounded-lg mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.map((card, index) => (
                <DashboardCard
                  key={index}
                  label={card.label}
                  description={card.description}
                  icon={card.icon}
                  value={card.value}
                  link={card.link}
                  descriptionColor={card.color}
                  loading={card.loading}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-12">
            <div className="flex gap-4 mb-4 justify-between">
              <div className="flex gap-3 h-full">
                <Input
                  placeholder="Search by first name..."
                  onChange={handleSearchChange}
                  className="w-60"
                />
                <RangePicker onChange={handleDateChange} />
              </div>
              {/* Ant Design Dropdown */}
              <div>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <button className="w-40 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 flex items-center justify-between">
                    {status === "All" ? "Filter Status" : status}
                    <DownOutlined className="ml-2 text-gray-400" />
                  </button>
                </Dropdown>
              </div>
            </div>

            <div className="table-responsive border-primary mb-5">
              {usersLoading ? (
                <BulletList />
              ) : (
                <Table
                  className="table-striped"
                  pagination={{
                    total: filteredUsers.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={filteredUsers}
                  rowKey={(record) => record.id}
                />
              )}
            </div>

            <UserDetailDrawer
              isVisible={drawerIsVisible}
              onClose={closeDrawer}
              user={userData} // Pass the user data to the drawer
              isLoading={userLoading} // Pass loading state to show skeleton
              error={userError} // Pass error
            />

            {/* Confirmation Modal */}
            <Modal
              title={
                selectedUser?.status === "active"
                  ? "Suspend User"
                  : "Reactivate User"
              }
              open={isModalOpen}
              onOk={handleConfirm}
              onCancel={handleCancel}
              okText={
                selectedUser?.status === "active" ? "Suspend" : "Reactivate"
              }
              cancelText="Cancel"
              confirmLoading={confirmLoading} // Use the appropriate loading state
            >
              <p>
                {selectedUser?.status === "active"
                  ? "Are you sure you want to suspend this user?"
                  : "Are you sure you want to reactivate this user?"}
              </p>
            </Modal>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllUsers;
