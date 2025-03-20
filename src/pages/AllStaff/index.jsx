import React, { useState, useMemo } from "react";
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
  Button,
} from "antd";
import { BulletList } from "react-content-loader";
import { itemRender, onShowSizeChange } from "../../components/Pagination.jsx";
import {
  CompletedIcon,
  DeleteIcon,
  EditIcon,
  getCurrentDate,
  getDate,
  PendingIcon,
  TotalCardIcon,
  ViewIcon,
} from "../../utils/constants.jsx";
import NewRequestButton from "../../components/Requests/NewRequest.jsx";
import {
  useFetchAllStaffQuery,
  useFetchAllUsersQuery,
  useFetchRequestByIdQuery,
  useFetchUserByIdQuery,
} from "../../services/apiSlice.jsx";
import dayjs from "dayjs";
import AccountDetailsDrawer from "../../components/Requests/AccountDetailsDrawer.jsx";
import {
  DownOutlined,
  RollbackOutlined,
  StopOutlined,
} from "@ant-design/icons";
import UserDetailDrawer from "../../components/Requests/UserDetailsDrawer.jsx";
import NewModalButton from "../../components/Requests/NewRequest.jsx";
import NewStaffModol from "../../components/Staff/NewStaffModal.jsx";
import StaffDetailDrawer from "../../components/Requests/StaffDetails.jsx";
import EditStaffModal from "../../components/Staff/EditStaffModal.jsx";

const { RangePicker } = DatePicker;
const { Option } = Select;

const AllStaff = () => {
  const [dateRange, setDateRange] = useState([]);
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [staffModalVisible, setStaffModalVisible] = useState(false);

  const { data: usersData, isLoading: usersLoading } = useFetchAllStaffQuery();

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

  // Filtering Users
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(usersData?.data)) return [];

    let filtered = [...usersData?.data];

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
  const BlockedUserCount = filteredUsers.filter(
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

  const handleEditStaff = (record) => {
    setViewId(record.id);
    setStaffModalVisible(true);
  };

  const userData = usersData?.data?.find((user) => user.id === viewId);

  const dashboardData = [
    {
      label: "Total Staff",
      description: "All users on Outsource Apply.",
      value: usersLoading ? "Loading..." : usersData?.data?.length || 0,
      link: "all-requests",
      color: "",
      icon: <TotalCardIcon />,
    },
    {
      label: "Active Staff",
      description: "Active users on Outsource Apply.",
      value: usersLoading ? "Loading..." : activeUsersCount || 0,
      link: "all-users.html",
      color: "text-green-500",
      icon: <PendingIcon />,
    },
    {
      label: "Blocked Staff",
      description: "Blocked users on Outsource Apply",
      value: usersLoading ? "Loading..." : BlockedUserCount || 0,
      link: "all_staff.html",
      color: "text-red-500",
      icon: <CompletedIcon />,
    },
  ];
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text, record) => (
        <p className="table-avatar">{text !== null ? text : "null"}</p>
      ),
    },

    {
      title: "Email / Phone",
      dataIndex: "companyName",
      render: (text, record, index) => (
        <div className="flex-column">
          <div className="mb-1">{record.email}</div>
          <div className="text-body-secondary">{record.phone}</div>
        </div>
      ),
    },
    {
      title: "Date Joined",
      dataIndex: "logdate",
      render: (text, record) => <p className="table-avatar">{getDate(text)}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => (
        <label
          className={
            text === "admin"
              ? "bg-green-100 text-green-700 text-xs font-medium px-4 py-0.5 rounded-full border border-green-700"
              : text === "staff"
              ? "bg-gray-100 text-gray-700 text-xs font-medium px-4 py-0.5 rounded-full border border-gray-700"
              : text === "super_admin"
              ? "bg-purple-100 text-purple-700 text-xs font-medium px-4 py-0.5 rounded-full border border-purple-700"
              : text === "IN REVIEW"
              ? "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
              : "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
          }
        >
          {text}
        </label>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <label
          className={
            text === "blocked"
              ? "bg-red-100 text-red-600 text-xs font-medium px-4 py-0.5 rounded-full border border-red-500"
              : text === "pending"
              ? "bg-orange-100 text-red-500 text-xs font-medium px-4 py-0.5 rounded-full border border-red-400"
              : text === "active"
              ? "bg-green-100 text-green-700 text-xs font-medium px-4 py-0.5 rounded-full border border-green-700"
              : text === "IN REVIEW"
              ? "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
              : "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
          }
        >
          {text}
        </label>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="flex items-center justify-start">
          <button
            onClick={() => showDrawer(record.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2"
          >
            <ViewIcon />
          </button>
          <button
            onClick={() => handleEditStaff(record)}
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2"
          >
            <EditIcon />
          </button>

          <button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2">
            {record.status === "active" || record.status === "pending" ? (
              <StopOutlined />
            ) : (
              <RollbackOutlined />
            )}
          </button>
        </div>
      ),
    },
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
            <h1 className="mb-1 text-xl font-bold">ALL STAFF</h1>
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
              <div className="flex gap-2">
                <NewModalButton
                  buttonText="New Staff"
                  ModalComponent={NewStaffModol}
                />
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button className="w-full !py-5 bg-gray-900 text-white !border-black hover:!text-white hover:!border-black hover:!bg-gray-800 flex items-center justify-between">
                    {status === "All" ? "Filter Status" : status}
                    <DownOutlined className="ml-2 text-gray-400" />
                  </Button>
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

            <StaffDetailDrawer
              isVisible={drawerIsVisible}
              onClose={closeDrawer}
              user={userData}
            />

            <EditStaffModal
              isOpen={staffModalVisible}
              onClose={() => setStaffModalVisible(false)}
              staffInfo={userData}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllStaff;
