import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/dashboard/DashboardCard.jsx";
import { itemRender, onShowSizeChange } from "../../components/Pagination.jsx";
import { Table } from "antd";
import { BulletList } from "react-content-loader";
import { getCurrentDate, getDate } from "../../utils/constants.jsx";
import { useFetchAllRequestsQuery } from "../../services/apiSlice.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const dateTo = getCurrentDate(); // Use the current date as the end date
  const dateFrom = "2025-01-01"; // Example start date

  // Fetch data for each status using separate hooks
  const { data: pendingData, error: pendingError, isLoading: pendingLoading } =
    useFetchAllRequestsQuery({ dateTo, dateFrom, status: "pending" });

  const { data: completedData, error: completedError, isLoading: completedLoading } =
    useFetchAllRequestsQuery({ dateTo, dateFrom, status: "completed" });

  const { data: rejectedData, error: rejectedError, isLoading: rejectedLoading } =
    useFetchAllRequestsQuery({ dateTo, dateFrom, status: "rejected" });

  const { data: inReviewData, error: inReviewError, isLoading: inReviewLoading } =
    useFetchAllRequestsQuery({ dateTo, dateFrom, status: "in_review" });

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
    ...(inReviewData?.data || [])
  ];
  
  const sortedRequests = totalRequests.some(item => item?.logdatetime)
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
      link: "all-requests",
      color: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
    {
      label: "Completed Requests",
      description: "Interviews has been scheduled for these requests",
      value: completedData?.length || 0,
      link: "all_users.html",
      color: "text-green-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
      ),
    },
    {
      label: "Pending Requests",
      description: "Awaiting feedback from the company",
      value: pendingData?.data?.length || 0,
      link: "all_staff.html",
      color: "text-red-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex">
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
      </div>
    </div>
  );
};

export default Dashboard;
