import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  Input,
  Button,
  Typography,
  Skeleton,
  Result,
  message,
} from "antd";
import { CloseOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import { useFetchAllJobsQuery } from "../../services/apiSlice";
import { FcBriefcase } from "react-icons/fc";
import NewJobReqModal from "../../components/Requests/NewJobRequestModal";
import EmptyState from "../../assets/images/magnifier-with-path.svg";
import { Link } from "react-router-dom";

const JobsPage = () => {
  const jobRefs = useRef({});
  const sidebarRefs = useRef({});
  const sidebarContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { data, isLoading, error } = useFetchAllJobsQuery();
  const jobsData = data?.data || [];

  const [activeJobId, setActiveJobId] = useState(
    jobsData?.[0]?.unique_id || ""
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
    if (jobsData.length) {
      setFilteredJobs(jobsData);
    }
  }, [jobsData]);

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
    setIsModalOpen(false); // Close modal after applying filters
  };

  // 🔹 Reset Filters
  const handleResetFilters = () => {
    setFilters({ title: "", location: "", company: "" });
    setFilteredJobs(jobsData);
    setIsModalOpen(false);
  };

  // 🔹 Observer to track top visible job
  useEffect(() => {
    let observer;
    if (jobRefs.current && Object.keys(jobRefs.current).length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          for (let entry of entries) {
            if (entry.isIntersecting) {
              const jobId = entry.target.getAttribute("data-id");
              if (jobId) setActiveJobId(jobId);
              break;
            }
          }
        },
        { root: null, rootMargin: "-50px 0px -50px 0px", threshold: 0.3 }
      );

      Object.values(jobRefs.current)
        .filter((job) => job instanceof Element) // Ensure only valid elements
        .forEach((job) => observer.observe(job));
    }

    return () => observer?.disconnect();
  }, [filteredJobs]);

  // 🔹 Scroll sidebar faster
  useEffect(() => {
    const activeJobElement = sidebarRefs.current[activeJobId];
    if (activeJobElement && sidebarContainerRef.current) {
      sidebarContainerRef.current.scrollTo({
        top: activeJobElement.offsetTop - sidebarContainerRef.current.offsetTop,
        behavior: "instant", // First, set an instant scroll
      });

      requestAnimationFrame(() => {
        sidebarContainerRef.current.scrollTo({
          top:
            activeJobElement.offsetTop - sidebarContainerRef.current.offsetTop,
          behavior: "smooth", // Then apply a smooth transition
        });
      });
    }
  }, [activeJobId]);

  // Scroll job details when clicking on sidebar items
  const handleSidebarClick = useCallback((jobId) => {
    setActiveJobId(jobId);

    const jobElement = jobRefs.current[jobId];
    if (jobElement) {
      jobElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const userData = sessionStorage.getItem("userInformation");
    if (userData) {
      setUserInformation(JSON.parse(userData));
    }
  }, []);

  // 🔹 Handle Apply
  const handleApplyNow = (jobId) => {
    if (!userInformation) {
      setIsAuthModalOpen(true);
      return;
    }
    const jobToApply = jobsData.find((job) => job.unique_id === jobId);
    window.open(jobToApply?.incoming_click_url, "_blank");
  };

  const handleApplyForMe = (jobId) => {
    if (!userInformation) {
      setIsAuthModalOpen(true);
    } else {
      const jobToApply = jobsData.find((job) => job.unique_id === jobId);
      setSelectedJob(jobToApply);
      setIsJobModalOpen(true);
    }
  };

  // 🔹 Handle API response status
  useEffect(() => {
    if (!data) return; // Ensure data is available

    if (data.statusCode !== "00") {
      console.log("❌ Picked error: ", data.statusCode);

      message.error(
        data.statusMessage || "Failed to fetch jobs. Please try again later."
      );

      setFilteredJobs([]); // Clear jobs on error
      return;
    }

    if (jobsData?.length) {
      setFilteredJobs(jobsData); // Update state only if jobsData is valid
    }
  }, [data, jobsData]);

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 p-6 bg-gray-100 pt-24 px-24 min-h-screen">
        {/* 🔹 Sidebar */}
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 h-full sticky top-0">
          <h2 className="text-lg font-semibold mb-4">Job Listings</h2>
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
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="p-3 border-b">
                  <Skeleton active paragraph={{ rows: 1 }} />
                </li>
              ))
            ) : filteredJobs.length > 0 ? (
              filteredJobs?.map((job) => (
                <li
                  key={job.unique_id}
                  ref={(el) => (sidebarRefs.current[job.unique_id] = el)}
                  onClick={() => handleSidebarClick(job.unique_id)}
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
                  Sorry, we were unable to find a matching job opening.
                </p>
                <p className="text-sm text-center text-gray-400">
                  Don’t let that stop you. Try again, and narrow or broaden your
                  search this time.
                </p>
              </li>
            )}
          </ul>
        </div>

        {/* 🔹 Job Details */}
        <div className="w-2/3 space-y-6 overflow-y-auto max-h-screen">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <Skeleton active />
              </div>
            ))
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
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
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-5 text-black">
              <img
                src={EmptyState}
                alt="No jobs found"
                className="w-24 h-24 opacity-50"
              />
              <p className="mt-2 text-lg text-center font-semibold">
                Sorry, we were unable to find a matching job opening.
              </p>
              <p className="text-sm text-center text-gray-400">
                Don’t let that stop you. Try again, and narrow or broaden your
                search this time.
              </p>
            </div>
          )}
        </div>

        <NewJobReqModal
          isOpen={isJobModalOpen}
          onClose={() => setIsJobModalOpen(false)}
          profile={userInformation?.profile}
          job={selectedJob} // Pass the selected job
        />
        {/* no user modal */}
        <Modal
          open={isAuthModalOpen}
          onCancel={() => setIsAuthModalOpen(false)}
          footer={null}
          title="Sign Up or Log In"
        >
          <p>You need to sign up or log in to apply for this job.</p>
          <div className="flex justify-end gap-4 mt-4">
            <Link to="/outsource-apply/login">
              <Button type="primary">Log In</Button>
            </Link>
            <Link to="/outsource-apply/sign-up">
              <Button>Sign Up</Button>
            </Link>
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
          <Input
            placeholder="Job title"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
          <Input
            placeholder="Location"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
          <Input
            placeholder="Company"
            value={filters.company}
            onChange={(e) =>
              setFilters({ ...filters, company: e.target.value })
            }
          />

          <Button
            type="primary"
            block
            onClick={handleApplyFilters}
            className="mb-3"
          >
            Apply Filters
          </Button>
          <Button type="link" block onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </Modal>
      </div>
    </div>
  );
};

export default JobsPage;
