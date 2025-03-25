import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Typography, Skeleton, message } from "antd";
import { CloseOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import {
  useFetchAllJobsQuery,
  useFetchFilteredJobsMutation,
} from "../../services/apiSlice";
import { FcBriefcase } from "react-icons/fc";
import NewJobReqModal from "../../components/Requests/NewJobRequestModal";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import EmptyState from "../../assets/images/magnifier-with-path.svg";

const SearchJobsPage = () => {
  const { jobTitle } = useParams();
  const jobRefs = useRef({});
  const sidebarRefs = useRef({});
  const sidebarContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { data } = useFetchAllJobsQuery();
  const jobsData = data?.data || [];
  const [loadingFilterJobs, setLoadingFilterJobs] = useState(true);
  const [triggerFetchJobs, { data: filterJobs }] =
    useFetchFilteredJobsMutation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeJobId, setActiveJobId] = useState(
    filterJobs?.[0]?.unique_id || ""
  );

  // 🔹 Filtering state
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    company: "",
  });

  // 🔹 Filter logic
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (jobTitle) {
      triggerFetchJobs({ jobTitle });
    }
  }, [jobTitle, triggerFetchJobs]);

  useEffect(() => {
    if (filterJobs?.data) {
      setFilteredJobs(filterJobs?.data);
    }
  }, [filterJobs]);

  // Check for user information on mount
  useEffect(() => {
    const userData = sessionStorage.getItem("userInformation");
    if (userData) {
      setUserInformation(JSON.parse(userData));
    }
  }, []);

  // Check for stored job and modal type after authentication
  useEffect(() => {
    const storedJob = localStorage.getItem("selectedJob");
    const modalType = searchParams.get("modal");

    if (storedJob && userInformation) {
      const parsedJob = JSON.parse(storedJob);
      const matchingJob = filteredJobs.find(
        (job) => job.unique_id === parsedJob.jobId
      );

      if (matchingJob) {
        setSelectedJob(matchingJob);

        if (modalType === "applyForMe") {
          setIsJobModalOpen(true);
        } else if (modalType === "applyNow") {
          window.open(matchingJob?.incoming_click_url, "_blank");
        }

        // Clean up
        localStorage.removeItem("selectedJob");
        cleanUpUrl();
      }
    }
  }, [userInformation, filteredJobs, searchParams]);

  // 🔹 Handle Apply Now
  const handleApplyNow = (jobId) => {
    const jobToApply = filteredJobs?.find((job) => job.unique_id === jobId);
    if (!userInformation) {
      setSelectedJob(jobToApply);
      updateUrlForModal("applyNow", jobToApply);
      setIsAuthModalOpen(true);
      return;
    }
    window.open(jobToApply?.incoming_click_url, "_blank");
  };

  // 🔹 Handle Apply for Me
  const handleApplyForMe = (jobId) => {
    const jobToApply = filteredJobs?.find((job) => job.unique_id === jobId);
    setSelectedJob(jobToApply);
    if (!userInformation) {
      updateUrlForModal("applyForMe", jobToApply);
      setIsAuthModalOpen(true);
      return;
    }
    setIsJobModalOpen(true);
  };

  // 🔹 Update URL for modal
  const updateUrlForModal = (modalType, job) => {
    const url = new URL(window.location);
    url.searchParams.set("modal", modalType);
    url.searchParams.set("jobId", job.unique_id);
    url.searchParams.set("title", job.cleaned_job_title.replace(/ /g, "-"));
    url.searchParams.set("company", job.company.replace(/ /g, "-"));
    window.history.pushState({}, "", url.toString());
  };

  // 🔹 Clean up URL
  const cleanUpUrl = () => {
    const url = new URL(window.location);
    url.searchParams.delete("modal");
    url.searchParams.delete("jobId");
    url.searchParams.delete("title");
    url.searchParams.delete("company");
    window.history.replaceState({}, "", url.toString());
  };

  // 🔹 Handle Auth Modal Close
  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    cleanUpUrl();
  };

  // 🔹 Handle Job Modal Close
  const handleJobModalClose = () => {
    localStorage.removeItem("selectedJob");
    setIsJobModalOpen(false);
    cleanUpUrl();
  };

  const handleApplyFilters = () => {
    if (!filteredJobs.length) return;

    const filtered = filteredJobs.filter((job) => {
      return (
        (!filters.title ||
          job.cleaned_job_title
            .toLowerCase()
            .includes(filters.title.toLowerCase())) &&
        (!filters.location ||
          job.city.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.company ||
          job.company.toLowerCase().includes(filters.company.toLowerCase()))
      );
    });

    setFilteredJobs(filtered);
    setIsModalOpen(false);
  };

  // 🔹 Reset Filters
  const handleResetFilters = () => {
    setFilters({ title: "", location: "", company: "" });
    setFilteredJobs(filterJobs?.data);
    setIsModalOpen(false);
  };

  // 🔹 Handle API response status
  useEffect(() => {
    if (!filterJobs) return;

    if (filterJobs.statusCode !== "00") {
      message.error(
        filterJobs.statusMessage ||
          "Failed to fetch jobs. Please try again later."
      );
      setFilteredJobs([]);
      setLoadingFilterJobs(false);
      return;
    }

    if (filterJobs?.length) {
      setFilteredJobs(filterJobs);
    }
    setLoadingFilterJobs(false);
  }, [filterJobs]);

  const getCurrentPageUrl = () => {
    return `${window.location.pathname}${window.location.search}`;
  };

  return (
    <div className="dark:text-black">
      <Navbar />
      <div className="flex gap-6 p-6 bg-gray-100 pt-24 px-24 min-h-screen">
        {/* 🔹 Sidebar */}
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 sticky top-0">
          <h2 className="text-base text-gray-500 font-Archivo font-semibold mb-4">
            Search results for{" "}
            <span className="text-black text-lg italic">"{jobTitle}"..</span>
          </h2>
          <Input
            placeholder="Search jobs..."
            className="w-full p-2 border rounded mb-4 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            readOnly
          />
          <ul
            ref={sidebarContainerRef}
            className="overflow-y-auto max-h-[75vh] border-t"
          >
            {loadingFilterJobs ? (
              Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="p-3 border-b">
                  <Skeleton active paragraph={{ rows: 1 }} />
                </li>
              ))
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <li
                  key={job.unique_id}
                  ref={(el) => (sidebarRefs.current[job.unique_id] = el)}
                  onClick={() => setActiveJobId(job.unique_id)}
                  className={`p-3 border-b cursor-pointer ${
                    activeJobId === job.unique_id ? "bg-gray-200" : ""
                  }`}
                >
                  <h3 className="text-purple-900 font-bold">
                    {job.cleaned_job_title}
                  </h3>
                  <Typography.Text className="text-sm text-gray-600">
                    {job.city}, {job.state}
                  </Typography.Text>
                </li>
              ))
            ) : (
              <li className="flex flex-col items-center justify-center p-5 text-black">
                <img
                  src={EmptyState}
                  alt="No jobs found"
                  className="w-24 h-24 opacity-50"
                />
                <p className="mt-2 text-lg text-center font-semibold">
                  Sorry, we were unable to find a matching job opening for "
                  <span>{jobTitle}</span>"
                </p>
                <p className="text-sm text-center text-gray-400">
                  Don't let that stop you. Try again, and narrow or broaden your
                  search this time.
                </p>
              </li>
            )}
          </ul>
        </div>

        {/* 🔹 Job Details */}
        <div className="w-2/3 space-y-6 overflow-y-auto max-h-screen">
          {loadingFilterJobs
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                  <Skeleton active />
                </div>
              ))
            : filteredJobs?.map((job) => (
                <div
                  key={job.unique_id}
                  ref={(el) => (jobRefs.current[job.unique_id] = el)}
                  data-id={job.unique_id}
                  className="bg-white shadow-lg rounded-lg p-6"
                >
                  <h2 className="text-base flex gap-2 items-center font-semibold">
                    <FcBriefcase /> {job.company}
                  </h2>
                  <h2 className="text-lg font-bold">{job.cleaned_job_title}</h2>
                  <div className="flex items-center mt-2">
                    <EnvironmentOutlined className="text-purple-700 mr-1" />
                    <Typography.Text className="text-sm text-gray-600">
                      {job.city}, {job.state}
                    </Typography.Text>
                  </div>
                  <p className="mt-4 text-gray-700">{job.description_digest}</p>
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      className="bg-blue-600 text-white px-6 py-2 rounded-md"
                      onClick={() => handleApplyNow(job.unique_id)}
                    >
                      Apply Now
                    </button>
                    <button
                      className="bg-purple-700 text-white px-6 py-2 rounded-md"
                      onClick={() => handleApplyForMe(job.unique_id)}
                    >
                      Apply for Me
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {/* New Job Request Modal - Only shows when user is authenticated */}
        {userInformation && (
          <NewJobReqModal
            isOpen={isJobModalOpen}
            onClose={handleJobModalClose}
            profile={userInformation?.profile}
            job={selectedJob}
          />
        )}

        {/* Auth Modal */}
        <Modal
          open={isAuthModalOpen}
          onCancel={handleAuthModalClose}
          footer={null}
          title={`Want to work as a ${selectedJob?.cleaned_job_title} at "${selectedJob?.company}"`}
        >
          <p>
            You need to be a member of{" "}
            <strong className="text-purple-700">Outsource Apply</strong> to
            apply for jobs. Please sign up or log in to continue.
          </p>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="bg-purple-800 text-white hover:!bg-purple-700"
              onClick={() => {
                localStorage.setItem(
                  "selectedJob",
                  JSON.stringify({
                    jobId: selectedJob?.unique_id,
                    title: selectedJob?.cleaned_job_title,
                    company: selectedJob?.company,
                    // Store current page URL for redirect back
                    redirectUrl: getCurrentPageUrl(),
                  })
                );
                window.location.href = `/login?redirect=${encodeURIComponent(
                  getCurrentPageUrl()
                )}`;
              }}
            >
              Log In
            </Button>
            <Button
              className="hover:!text-purple-700 hover:!border-purple-700"
              onClick={() => {
                localStorage.setItem(
                  "selectedJob",
                  JSON.stringify({
                    jobId: selectedJob?.unique_id,
                    title: selectedJob?.cleaned_job_title,
                    company: selectedJob?.company,
                    // Store current page URL for redirect back
                    redirectUrl: getCurrentPageUrl(),
                  })
                );
                window.location.href = `/sign-up?redirect=${encodeURIComponent(
                  getCurrentPageUrl()
                )}`;
              }}
            >
              Sign Up
            </Button>
          </div>
        </Modal>

        {/* 🔹 Filter Modal */}
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          closeIcon={<CloseOutlined />}
          title="Filters"
        >
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label>Job Title:</label>
              <Input
                placeholder="Job title"
                value={filters.title}
                onChange={(e) =>
                  setFilters({ ...filters, title: e.target.value })
                }
              />
            </div>
            <div>
              <label>location</label>
              <Input
                placeholder="Location"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />
            </div>
            <div>
              <label>Company</label>
              <Input
                placeholder="Company"
                value={filters.company}
                onChange={(e) =>
                  setFilters({ ...filters, company: e.target.value })
                }
              />
            </div>
          </div>

          <Button
            type="primary"
            block
            onClick={handleApplyFilters}
            className="mb-3 bg-purple-800 hover:!bg-purple-700"
          >
            Apply Filters
          </Button>
          <Button
            type="link"
            block
            onClick={handleResetFilters}
            className="border-none hover:!border-none text-purple-600"
          >
            Reset Filters
          </Button>
        </Modal>
      </div>
    </div>
  );
};

export default SearchJobsPage;
