import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/dashboard/DashboardCard.jsx";
import { itemRender, onShowSizeChange } from "../../components/Pagination.jsx";
import { Modal, Table } from "antd";
import { BulletList } from "react-content-loader";
import {
  CompletedIcon,
  getCurrentDate,
  getDate,
  PendingIcon,
  TotalReqIcon,
} from "../../utils/constants.jsx";
import { useFetchAllRequestsQuery } from "../../services/apiSlice.jsx";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const dateTo = getCurrentDate(); // Use the current date as the end date
  const dateFrom = "2025-01-01"; // Example start date
  const [profileCompleteModal, setProfileCompleteModal] = useState(false);

  // Check profile completion status on component mount
  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInformation"));
    if (userInfo?.profile?.otherProfileDetails?.[0]?.currentCv === null || 
        userInfo?.profile?.otherProfileDetails?.[0]?.currentCv === "") {
      setProfileCompleteModal(true);
    }
  }, []);

  // Fetch data for each status using separate hooks
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

  const sortedRequests = totalRequests.some((item) => item?.logdatetime)
    ? totalRequests.sort((a, b) => {
        const dateA = new Date(a?.logdatetime || 0);
        const dateB = new Date(b?.logdatetime || 0);
        return dateB - dateA; // Sort by latest logdatetime
      })
    : totalRequests; // If no logdatetime, return as-is

  console.log("Total Requests:", sortedRequests);

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
  ];

  const dashboardData = [
    {
      label: "Total Requests",
      description: "Requests you've been making all these while",
      value: totalLength ? totalLength : 0,
      link: "/all-requests",
      color: "",
      icon: <TotalReqIcon />,
      loading: isLoading,
    },
    {
      label: "Completed Requests",
      description: "Requests has been reviewed and submitted",
      value: completedData?.length || 0,
      link: "/all-requests",
      color: "text-green-500",
      icon: <CompletedIcon />,
      loading: isLoading,
    },
    {
      label: "Pending Requests",
      description: "Requests are still being reviewed",
      value: pendingData?.data?.length || 0,
      link: "all_staff.html",
      color: "text-red-500",
      icon: <PendingIcon />,
      loading: isLoading,
    },
  ];

  return (
    <div className="flex dark:text-black">
      <Navbar />
      <Sidebar />
      <div className="px-8 py-8 sm:ml-64 bg-gray-50 w-full h-full">
        <main className="rounded-lg mt-14 mb-12l">
          <div className="mb-12">
            <h1 className="mb-1 text-xl font-bold">DASHBOARD</h1>
          </div>

          <div className="w-full rounded-lg mb-12">
            <div className="mb-4">
              <div className="section-title">
                <label className="text-lg font-semibold">Overview</label>
              </div>
              <div className="section-sub-text text-sm">
                <h6>
                  Here's an Overview of your Dashboard and other active
                  information
                </h6>
              </div>
            </div>
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
            <div className="flex justify-between mb-4">
              <div className="section-header-text">
                <div className="section-title">
                  <label className="text-lg font-semibold">
                    Recent Updates
                  </label>
                </div>
                <div className="section-sub-text text-sm">
                  <h6>See all the recent updates relating to your requests</h6>
                </div>
              </div>
              <div>
                <Link
                  to="/all-requests"
                  className="block py-1 px-4 bg-purple-700 text-white rounded hover:bg-purple-600 hover:text-white text-sm"
                >
                  View All
                </Link>
              </div>
            </div>

            <div className="table-responsive border-primary mb-5">
              {loading ? (
                <BulletList />
              ) : (
                <Table
                  className="table-striped"
                  pagination={{
                    total: sortedRequests?.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={sortedRequests}
                  rowKey={(record) => record.id}
                />
              )}
            </div>
          </div>
        </main>
         {/* Profile Completion Modal */}
         <Modal
          open={profileCompleteModal}
          onCancel={() => setProfileCompleteModal(false)}
          footer={null}
          centered
          className="text-center"
        >
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <UserOutlined className="text-purple-600 text-3xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Your Profile</h3>
            <p className="text-gray-600 mb-6">
              Do you want to complete your profile to have a seamless flow on the platform?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setProfileCompleteModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Maybe Later
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="px-6 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
