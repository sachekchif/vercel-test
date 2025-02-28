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
  RejectedIcon,
  TotalCardIcon,
  TotalReqIcon,
  ViewIcon,
} from "../../utils/constants.jsx";
import NewRequestButton from "../../components/Requests/NewRequest.jsx";
import {
  useFetchAllRequestsQuery,
  useFetchAllStaffQuery,
  useFetchAllUsersQuery,
  useFetchRequestByIdQuery,
  useFetchUserByIdQuery,
} from "../../services/apiSlice.jsx";
import dayjs from "dayjs";
import AccountDetailsDrawer from "../../components/Requests/AccountDetailsDrawer.jsx";
import { DownOutlined } from "@ant-design/icons";
import UserDetailDrawer from "../../components/Requests/UserDetailsDrawer.jsx";
import NewModalButton from "../../components/Requests/NewRequest.jsx";
import NewStaffModol from "../../components/Staff/NewStaffModal.jsx";
import EditRequestModal from "../../components/Requests/EditRequestModal.jsx";

const { RangePicker } = DatePicker;
const { Option } = Select;

const AdminRequest = () => {
  const [dateRange, setDateRange] = useState([]);
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);

  const getDateTo = getCurrentDate(); // Use the current date as the end date
  const getDateFrom = new Date(getDateTo);
  getDateFrom.setDate(getDateFrom.getDate() - 7); // Subtract 7 dayas from the dateTo

  // Format the dateTo and dateFrom to the desired string format (optional)
  // const dateFrom = getDateFrom.toISOString().split('T')[0]; // YYYY-MM-DD
  // const dateTo = getDateTo; // Assuming getCurrentDate() returns in YYYY-MM-DD format
  const dateTo = getCurrentDate(); // Use the current date as the end date
  const dateFrom = "2025-01-01";

  // console.log(formattedDateFrom, formattedDateTo);

  // Fetch user data
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useFetchRequestByIdQuery(
    { id: viewId },
    { skip: !viewId } // Skip query if viewId is not set
  );
  const { data: usersData, isLoading: usersLoading } = useFetchAllStaffQuery();

  const {
    data: pendingData,
    error: pendingError,
    isLoading: pendingLoading,
  } = useFetchAllRequestsQuery({ dateTo, dateFrom, status: "pending" });

  const {
    data: completedData,
    error: completedError,
    isLoading: completedLoading,
  } = useFetchAllRequestsQuery({ dateTo, dateFrom, status: "completed" });

  const {
    data: rejectedData,
    error: rejectedError,
    isLoading: rejectedLoading,
  } = useFetchAllRequestsQuery({ dateTo, dateFrom, status: "rejected" });

  const {
    data: inReviewData,
    error: inReviewError,
    isLoading: inReviewLoading,
  } = useFetchAllRequestsQuery({ dateTo, dateFrom, status: "in_review" });

  // Combine loading and error states
  const isLoading =
    pendingLoading || completedLoading || rejectedLoading || inReviewLoading;
  const error =
    pendingError || completedError || rejectedError || inReviewError;

  const totalLength =
    (pendingData?.data?.length || 0) +
    (completedData?.data?.length || 0) +
    (rejectedData?.data?.length || 0) +
    (inReviewData?.data?.length || 0);
  console.log("Pending Requests:", pendingData);
  console.log("Completed Requests:", completedData);
  console.log("Rejected Requests:", rejectedData);
  console.log("In Review Requests:", inReviewData);

  const totalRequests = [
    ...(pendingData?.data || []),
    ...(completedData?.data || []),
    ...(rejectedData?.data || []),
    ...(inReviewData?.data || []),
  ];

  console.log("Total Requests:", totalRequests);

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
    if (!Array.isArray(totalRequests)) return [];

    let filtered = [...totalRequests];

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
        user.jobTitle?.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by logdate (newest first)
    return filtered.sort(
      (a, b) => new Date(b?.logdate || 0) - new Date(a?.logdate || 0)
    );
  }, [usersData, startDate, endDate, status, searchTerm]);

  console.log("Filtered Users:", filteredUsers);
  

  const showDrawer = (id) => {
    console.log("yyy",id);
    
    setViewId(id);
    setDrawerIsVisible(true);
  };

  const closeDrawer = () => {
    setDrawerIsVisible(false);
    setViewId(null);
  };

  const handleEditRequest = (record) => {
    setViewId(record.id);
    setEditModalVisible(true);
  };
  const toggleModal = () => setModalOpen(!modalOpen);

  const dashboardData = [
    {
      label: "Total Requests",
      description: "Overall Requests processed",
      value: totalLength ? totalLength : 0,
      link: "all-requests",
      color: "",
      icon: <TotalReqIcon />,
    },
    {
      label: "Approved Requests",
      description: "Requests that's been approved",
      value: completedData?.length || 0,
      link: "all_users.html",
      color: "text-green-500",
      icon: <CompletedIcon />,
    },
    {
      label: "Pending Requests",
      description: "Requests that's yet to be reviewed",
      value: pendingData?.data?.length || 0,
      link: "all_staff.html",
      color: "text-amber-500",
      icon: <PendingIcon />,
    },
    {
      label: "Rejected Requests",
      description: "Requests that's been rejected",
      value: rejectedData?.data?.length || 0,
      link: "all_staff.html",
      color: "text-red-500",
      icon: <RejectedIcon />,
    },
  ];
  const columns = [
    {
      title: "JOB TITLE",
      dataIndex: "jobTitle",
      render: (text, record) => (
        <p className="table-avatar">{text !== null ? text : "null"}</p>
      ),
    },

    {
      title: "Company Name",
      dataIndex: "companyName",
      render: (text, record, index) => (
        <div className="flex-column">
          <div className="mb-1">{record.companyName}</div>
          <div className="text-body-secondary">{record.location}</div>
        </div>
      ),
    },
    {
      title: "Application Date",
      dataIndex: "applicationDate",
      render: (text, record) => <p className="table-avatar">{text}</p>,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      render: (text, record, index) => (
        <div className="flex-column">
          <div className="mb-1">{record.companyName}</div>
          <div className="text-body-secondary">{record.location}</div>
        </div>
      ),
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
              : text === "Approved"
              ? "bg-green-100 text-green-800 text-xs font-medium px-4 py-0.5 rounded-full border border-green-500"
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
            onClick={() => handleEditRequest(record)}
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2"
          >
            <EditIcon />
          </button>

          <button
            onClick={toggleModal}
            className="bg-red-500 hover:bg-red-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2"
          >
            <DeleteIcon />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div className="flex gap-2">
                {/* <NewModalButton
                  buttonText="New Staff"
                  ModalComponent={NewStaffModol}
                /> */}
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
          </div>

          <AccountDetailsDrawer
              isVisible={drawerIsVisible}
              onClose={closeDrawer}
              user={userData} // Pass the user data to the drawer
              isLoading={userLoading} // Pass loading state to show skeleton
              error={userError} // Pass error
            />
            <EditRequestModal
              isOpen={editModalVisible}
              onClose={() => setEditModalVisible(false)}
              profile={userData}
            />
        </main>
      </div>
    </div>
  );
};

export default AdminRequest;
