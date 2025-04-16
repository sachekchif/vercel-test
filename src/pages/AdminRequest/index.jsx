import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Navbar from "../../components/Navbar.jsx";
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
  message,
} from "antd";
import { BulletList } from "react-content-loader";
import { itemRender, onShowSizeChange } from "../../components/Pagination.jsx";
import {
  capitalizeText,
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
  useUpdateRequestInReviewMutation,
} from "../../services/apiSlice.jsx";
import dayjs from "dayjs";
import AccountDetailsDrawer from "../../components/Requests/AccountDetailsDrawer.jsx";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
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
  const [updatingRequestId, setUpdatingRequestId] = useState(null);

  const getDateTo = getCurrentDate(); // Use the current date as the end date
  const getDateFrom = new Date(getDateTo);
  getDateFrom.setDate(getDateFrom.getDate() - 7); // Subtract 7 days from the dateTo

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
    refetch: pendingRefetch,
  } = useFetchAllRequestsQuery({ dateTo, dateFrom, status: "pending" });

  const {
    data: completedData,
    error: completedError,
    isLoading: completedLoading,
    refetch: completeRefetch,
  } = useFetchAllRequestsQuery({ dateTo, dateFrom, status: "completed" });

  const {
    data: rejectedData,
    error: rejectedError,
    loading: rejectedLoading,
    refetch: rejectedRefetch,
  } = useFetchAllRequestsQuery({ dateTo, dateFrom, status: "rejected" });

  const {
    data: inReviewData,
    error: inReviewError,
    loading: inReviewLoading,
    refetch: inReviewRefetch,
  } = useFetchAllRequestsQuery({ dateTo, dateFrom, status: "in_review" });

  const {
    data: reviewedData,
    error: reviewedError,
    loading: reviewedLoading,
    refetch: reviewedRefetch,
  } = useFetchAllRequestsQuery({ dateTo, dateFrom, status: "reviewed" });

  // console.log("Loading", reviewedData);
  

  const [updateRequestInReview, { isLoading: isUpdating }] =
    useUpdateRequestInReviewMutation();

  // Combined refetch function
  const refetchAllRequests = async () => {
    if (
      pendingLoading ||
      completedLoading ||
      rejectedLoading ||
      inReviewLoading || 
      reviewedLoading
    ) {
      return; // Skip refetch if data is already being fetched
    }

    try {
      await Promise.all([
        pendingRefetch(),
        completeRefetch(),
        rejectedRefetch(),
        inReviewRefetch(),
        reviewedRefetch(),
      ]);
      // console.log("All requests refetched successfully!");
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
        }, 30000);
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
  }, [pendingRefetch, completeRefetch, rejectedRefetch, inReviewRefetch, reviewedData]);

  // Combine loading and error states


  const totalLength =
    (pendingData?.data?.length || 0) +
    (completedData?.data?.length || 0) +
    (rejectedData?.data?.length || 0) +
    (inReviewData?.data?.length || 0) +
    (reviewedData?.data?.length || 0);
  // console.log("Pending Requests:", pendingData);
  // console.log("Completed Requests:", completedData);
  // console.log("Rejected Requests:", rejectedData);
  // console.log("In Review Requests:", inReviewData);

  const handleTreatRequest = async (id) => {
    const requestData = {
      requestId: id,
    };

    try {
      setUpdatingRequestId(id);
      // Call the mutation to update the request status
      const response = await updateRequestInReview(requestData).unwrap();
      // console.log("Response:", response);

      if (response.statusCode === "00") {
        message.success("Request updated successfully!");
        refetchAllRequests(); // Refetch all endpoints to update the UI
      } else {
        message.error(response.statusMessage || "Failed to update request.");
      }
    } catch (error) {
      message.error("Failed to update request.");
      console.error("Error updating request:", error);
    }finally {
      // Clear the updating request ID
      setUpdatingRequestId(null);
    }
  };

  const totalRequests = [
    ...(pendingData?.data || []),
    ...(completedData?.data || []),
    ...(rejectedData?.data || []),
    // ...(inReviewData?.data || []),
    ...(reviewedData?.data || []),
  ];

  // console.log("Totalaa Requests:", totalRequests);
  // Retrieve user information from sessionStorage
  const userDataInfo = JSON.parse(sessionStorage.getItem("userInformation"));


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
  }, [totalRequests, startDate, endDate, status, searchTerm]);

  // console.log("Filtered Users:", filteredUsers);
  // Count Users by Status
  const activeUsersCount = usersData?.data?.filter(
    (user) => user.status === "active"
  ).length;
  const BlockedUserCount = filteredUsers.filter(
    (user) => user.status === "pending"
  ).length;

  const showDrawer = (id) => {
    console.log("yyy", id);

    setViewId(id);
    setDrawerIsVisible(true);
  };

  const closeDrawer = () => {
    setDrawerIsVisible(false);
    setViewId(null);
  };

  const handleEditRequest = (record) => {
    setViewId(record);
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
      loading: usersLoading,
    },
    {
      label: "Approved Requests",
      description: "Requests that's been approved",
      value: completedData?.length || 0,
      link: "all_users.html",
      color: "text-green-500",
      icon: <CompletedIcon />,
      loading: usersLoading,
    },
    {
      label: "Pending Requests",
      description: "Requests that's yet to be reviewed",
      value: pendingData?.data?.length || 0,
      link: "all_staff.html",
      color: "text-amber-500",
      icon: <PendingIcon />,
      loading: usersLoading,
    },
    {
      label: "Rejected Requests",
      description: "Requests that's been rejected",
      value: rejectedData?.data?.length || 0,
      link: "all_staff.html",
      color: "text-red-500",
      icon: <RejectedIcon />,
      loading: usersLoading,
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
      dataIndex: "logdatetime",
      render: (text, record) => <p className="table-avatar">{getDate(text)}</p>,
    },
    {
      title: "Initiated By",
      dataIndex: "companyName",
      render: (text, record, index) => (
        <div className="flex-column">
          <div className="mb-1">{record.reveiwedByName}</div>
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
              : text === "pending"
              ? "bg-orange-100 text-red-500 text-xs font-medium px-4 py-0.5 rounded-full border border-red-400"
              : text === "completed"
              ? "bg-green-100 text-green-800 text-xs font-medium px-4 py-0.5 rounded-full border border-green-500"
              : text === "IN REVIEW"
              ? "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
              : "bg-blue-100 text-blue-600 text-xs font-medium px-4 py-0.5 rounded-full border border-blue-500"
          }
        >
          {capitalizeText(text)}
        </label>
      ),
    },
    {
      title: "Treat",
      render: (text, record) => {
        // Check if the user is a superadmin
        const isSuperAdmin = userDataInfo?.profile?.role === "super_admin";
    
        // Show "Treat" button only if status is "pending"
        if (record.status === "pending") {
          return (
            <button
              onClick={() => handleTreatRequest(record.id)}
              className={`font-medium rounded border-none items-center justify-center flex px-2 py-1 ${
                updatingRequestId === record.id
                  ? "bg-gray-300 border-gray-500 text-gray-500 cursor-not-allowed"
                  : isSuperAdmin
                  ? "bg-gray-200 text-gray-500 border-gray-500 border-1 cursor-not-allowed" // Disabled style for superadmin
                  : "bg-gray-800 hover:bg-black text-white hover:border-gray-800 hover:border-2"
              }`}
              disabled={updatingRequestId === record.id || isSuperAdmin} // Disable for superadmin
            >
              {updatingRequestId === record.id ? (
                <span className="flex items-center text-gray-500 gap-2">
                  <Spin
                    indicator={<LoadingOutlined twoToneColor="#6b7280" spin />}
                    size="small"
                  />{" "}
                  Loading...
                </span>
              ) : (
                "Treat"
              )}
            </button>
          );
        } else if (record.status === "in_review") {
          return (
            <button
              disabled // Disable the button if needed
              className="bg-gray-200 text-gray-500 border-gray-500 border-1 rounded font-normal items-center justify-center flex px-2 py-1 cursor-not-allowed"
            >
              Treating...
            </button>
          );
        }
        return null; // Return null if status is not "pending"
      },
    },
    {
      title: "Action",
      render: (text, record) => {

        return (
          <div className="flex items-center justify-start">
            {/* View Button */}
            <button
              onClick={() => showDrawer(record.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2"
            >
              <ViewIcon />
            </button>

            {/* Edit Button (Conditional) */}
            {record.status === "in_review" &&
            (userDataInfo?.profile?.firstName + " " + userDataInfo?.profile?.lastName ) === record?.reveiwedByName ? (
              <button
                onClick={() => handleEditRequest(record?.id)}
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2"
              >
                <EditIcon />
              </button>
            ) : null}

            {/* Delete Button */}
            {/* <button
              onClick={toggleModal}
              className="bg-red-500 hover:bg-red-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2"
            >
              <DeleteIcon />
            </button> */}
          </div>
        );
      },
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
    <div className="flex dark:text-black">
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
            isLoading={userLoading}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminRequest;
