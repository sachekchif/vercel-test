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
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const JobsPage = () => {
  const jobRefs = useRef({});
  const sidebarRefs = useRef({});
  const sidebarContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useFetchAllJobsQuery();
  const jobsData = data?.data || [];
  const navigate = useNavigate();

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

    // Show message if no results after filtering
    if (filtered.length === 0) {
      message.info("No jobs match your filters. Try different criteria.");
      setFilters({ title: "", location: "", company: "" });
      setFilteredJobs(jobsData);
      setIsModalOpen(false); // Keep modal open
    }

    setIsModalOpen(false);
  };

  // 🔹 Reset Filters
  const handleResetFilters = () => {
    setFilters({ title: "", location: "", company: "" });
    setFilteredJobs(jobsData);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    // Only reset filters if there are no results
    if (filteredJobs.length === 0) {
      setFilters({ title: "", location: "", company: "" });
      setFilteredJobs(jobsData);
      // setIsModalOpen(false);
    }
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
    const jobToApply = jobsData.find((job) => job.unique_id === jobId);
    if (!userInformation) {
      setSelectedJob(jobToApply);
      updateUrlForModal("applyNow", jobToApply);
      setIsAuthModalOpen(true);
      return;
    }
    window.open(jobToApply?.incoming_click_url, "_blank");
  };

  const handleApplyForMe = (jobId) => {
    const jobToApply = jobsData.find((job) => job.unique_id === jobId);
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

  // 🔹 Handle API response status
  useEffect(() => {
    if (!data) return; // Ensure data is available

    if (data.statusCode !== "00") {
      console.log("❌ Picked error: ", data.statusCode);

      message.error(
        data.statusMessage || "Failed to fetch jobs. Please try again later."
      );

      setFilteredJobs([]); // Clear jobs on error
      setIsLoading(false); // Stop loading
      return;
    }

    if (jobsData?.length) {
      setFilteredJobs(jobsData); // Update state only if jobsData is valid
    }
    setIsLoading(false); // Stop loading
  }, [data, jobsData]);
  // Check localStorage for selected job after login
  useEffect(() => {
    const storedJob = localStorage.getItem("selectedJob");
    if (storedJob && userInformation) {
      // Only proceed if user is logged in
      const parsedJob = JSON.parse(storedJob);
      const jobToApply = filteredJobs.find(
        (job) => job.unique_id === parsedJob.jobId
      );
      if (jobToApply) {
        setSelectedJob(jobToApply);
        setIsJobModalOpen(true); // Open the modal
        updateUrlForModal("applyForMe", jobToApply);
      }
    }
  }, [filteredJobs, userInformation]); // Depend on userInformation to trigger after login

  const getCurrentPageUrl = () => {
    return `${window.location.pathname}${window.location.search}`;
  };

  return (
    <div className="">
      <Helmet>
        <title>
          Jobs Listings | Find & Apply Easily – OutsourceApply
        </title>
        <meta
          name="description"
          content="Browse 10,000+ remote jobs updated daily. Filter by role, salary, or location—apply in one click and get hired faster."
        />
        <meta
          name="keywords"
          content="  
remote job listings, latest remote jobs, work from home job board,  
remote jobs by category, remote jobs by salary, remote jobs by location,  
remote tech jobs, remote marketing jobs, remote customer support jobs,  
no-experience remote jobs, entry-level remote jobs, freelance job board,  
remote job search, find remote work, apply for remote jobs,  
best remote job sites, remote job aggregator, remote job alerts"
        />
        <meta
          property="og:title"
          content="10,000+ Remote Jobs – Get Hired, With Ease"
        />
        <meta
          property="og:description"
          content="Find your perfect remote job fast. Filter by skills, pay, or flexibility—no endless scrolling."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.outsourceapply.com/jobs" />
        <meta
          property="og:image"
          content="https://www.outsourceapply.com/assets/og-all-jobs.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Browse Remote Jobs | OutsourceApply"
        />
        <meta
          name="twitter:description"
          content="Your next remote job is waiting. Search, apply, and get hired—all in one place."
        />
        <meta
          name="twitter:image"
          content="https://www.outsourceapply.com/assets/tw-all-jobs.jpg"
        />
      </Helmet>
      <Navbar />
      <div className="flex gap-6 p-6 bg-gray-100 pt-24 px-24 min-h-screen dark:text-black">
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
        <div className="w-2/3 mr-2 space-y-6 overflow-y-auto max-h-screen custom-scrollbar pr-4">
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
          onClose={handleJobModalClose}
          profile={userInformation?.profile}
          job={selectedJob} // Pass the selected job
        />
        {/* no user modal */}
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
          onCancel={handleModalClose}
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

export default JobsPage;
