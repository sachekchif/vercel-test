import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Typography, Skeleton } from "antd";
import { CloseOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import { useFetchAllJobsQuery } from "../../services/apiSlice";
import { FcBriefcase } from "react-icons/fc";
import NewJobReqModal from "../../components/Requests/NewJobRequestModal";

const JobsPage = () => {
  const jobRefs = useRef({});
  const sidebarRefs = useRef({});
  const sidebarContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { data, isLoading } = useFetchAllJobsQuery();
  const jobsData = data?.data || [];

  const [activeJobId, setActiveJobId] = useState(jobsData?.[0]?.unique_id || "");

  // 🔹 Filtering state
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    company: "",
  });
  const [filteredJobs, setFilteredJobs] = useState(jobsData);

  // 🔹 Apply Filters
  const handleApplyFilters = () => {
    if (!jobsData.length) return;

    const filtered = jobsData.filter((job) => {
      return (
        (!filters.title || job.cleaned_job_title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (!filters.location || job.city.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.company || job.company.toLowerCase().includes(filters.company.toLowerCase()))
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

      Object.values(jobRefs.current).forEach((job) => observer.observe(job));
    }

    return () => observer?.disconnect();
  }, [filteredJobs]);

  // 🔹 Scroll sidebar faster
  useEffect(() => {
    const activeJobElement = sidebarRefs.current[activeJobId];
    if (activeJobElement && sidebarContainerRef.current) {
      sidebarContainerRef.current.scrollTo({
        top: activeJobElement.offsetTop - sidebarContainerRef.current.offsetTop,
        behavior: "auto",
      });

      requestAnimationFrame(() => {
        sidebarContainerRef.current.scrollTo({
          top: activeJobElement.offsetTop - sidebarContainerRef.current.offsetTop,
          behavior: "smooth",
        });
      });
    }
  }, [activeJobId]);

  // 🔹 Handle Sidebar Click
  const handleSidebarClick = useCallback((jobId) => {
    setActiveJobId(jobId);
    jobRefs.current[jobId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 p-6 bg-gray-100 pt-24 px-24 min-h-screen">
        {/* 🔹 Sidebar */}
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 h-screen sticky top-0">
          <h2 className="text-lg font-semibold mb-4">Job Listings</h2>
          <Input
            placeholder="Search jobs..."
            className="w-full p-2 border rounded mb-4 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            readOnly
          />
          <ul ref={sidebarContainerRef} className="overflow-y-auto max-h-[75vh] border-t">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <li key={index} className="p-3 border-b">
                    <Skeleton active paragraph={{ rows: 1 }} />
                  </li>
                ))
              : filteredJobs.map((job) => (
                  <li
                    key={job.unique_id}
                    ref={(el) => (sidebarRefs.current[job.unique_id] = el)}
                    onClick={() => handleSidebarClick(job.unique_id)}
                    className={`p-3 border-b cursor-pointer ${activeJobId === job.unique_id ? "bg-gray-200" : ""}`}
                  >
                    <h3 className="text-purple-900 font-bold">{job.cleaned_job_title}</h3>
                    <Typography.Text className="text-sm text-gray-600">
                      {job.city}, {job.state}
                    </Typography.Text>
                  </li>
                ))}
          </ul>
        </div>

        {/* 🔹 Job Details */}
        <div className="w-2/3 space-y-6 overflow-y-auto max-h-screen">
          {filteredJobs.map((job) => (
            <div key={job.unique_id} className="bg-white shadow-lg rounded-lg p-6">
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
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Filter Modal */}
      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} closeIcon={<CloseOutlined />} title="Filters">
        <Input placeholder="Job title" value={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
        <Input placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <Input placeholder="Company" value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })} />

        <Button type="primary" block onClick={handleApplyFilters} className="mb-3">
          Apply Filters
        </Button>
        <Button type="link" block onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </Modal>
    </div>
  );
};

export default JobsPage;
