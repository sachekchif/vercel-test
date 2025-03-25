import { useState, useEffect } from "react";
import { Card, Typography, Button, Skeleton, Modal } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useFetchAllJobsQuery } from "../../services/apiSlice";
import NewJobReqModal from "../../components/Requests/NewJobRequestModal";
import { FcBriefcase } from "react-icons/fc";
import EmptyState from "../../assets/images/magnifier-with-path.svg";

const JobCard = ({ job, handleApplyNow, handleApplyForMe, isLoading }) => {
  return (
    <Card className="max-w-sm shadow-md rounded-lg" bordered>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <>
          <div className="flex flex-col mb-6">
            <Typography.Title level={5} className="text-xl font-bold">
              {job.cleaned_job_title.length > 30
                ? `${job.cleaned_job_title.slice(0, 30)}...`
                : job.cleaned_job_title}
            </Typography.Title>
            <Typography.Text className="text-gray-700 text-md flex gap-2 items-center">
              <FcBriefcase /> {job.company}
            </Typography.Text>
            <div className="flex items-center mt-2">
              <EnvironmentOutlined className="text-purple-700 mr-1" />
              <Typography.Text className="text-sm">{job.city}</Typography.Text>
            </div>
          </div>
          <div className="text-center flex gap-2">
            <Button
              type="primary"
              className="bg-blue-700 hover:!bg-blue-600"
              block
              onClick={() => handleApplyNow(job.unique_id)}
            >
              Apply now
            </Button>
            <Button
              type="primary"
              className="bg-purple-700 hover:!bg-purple-600"
              block
              onClick={() => handleApplyForMe(job.unique_id)}
            >
              Apply for me
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

const JobListing = () => {
  const { data, isLoading, isError } = useFetchAllJobsQuery();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    if (data?.statusCode === "00" && data?.data?.length) {
      setFilteredJobs(data.data.slice(0, 4));
    } else {
      setFilteredJobs([]);
    }
  }, [data]);

  useEffect(() => {
    const userData = sessionStorage.getItem("userInformation");
    if (userData) {
      setUserInformation(JSON.parse(userData));
    }
  }, []);

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

  const updateUrlForModal = (modalType, job) => {
    const url = new URL(window.location);
    url.searchParams.set("modal", modalType);
    url.searchParams.set("jobId", job.unique_id);
    url.searchParams.set("title", job.cleaned_job_title.replace(/ /g, "-"));
    url.searchParams.set("company", job.company.replace(/ /g, "-"));
    window.history.pushState({}, "", url.toString());
  };

  const cleanUpUrl = () => {
    const url = new URL(window.location);
    url.searchParams.delete("modal");
    url.searchParams.delete("jobId");
    url.searchParams.delete("title");
    url.searchParams.delete("company");
    window.history.replaceState({}, "", url.toString());
  };

  const handleApplyNow = (jobId) => {
    const jobToApply = filteredJobs.find((job) => job.unique_id === jobId);
    if (!userInformation) {
      setSelectedJob(jobToApply);
      updateUrlForModal("applyNow", jobToApply);
      setIsAuthModalOpen(true);
      return;
    }
    window.open(jobToApply?.incoming_click_url, "_blank");
  };

  const handleApplyForMe = (jobId) => {
    const jobToApply = filteredJobs.find((job) => job.unique_id === jobId);
    setSelectedJob(jobToApply);
    if (!userInformation) {
      updateUrlForModal("applyForMe", jobToApply);
      setIsAuthModalOpen(true);
      return;
    }
    setIsJobModalOpen(true);
  };

  const handleAuthModalClose = () => { 
    setIsAuthModalOpen(false);
    cleanUpUrl();
  };

  const handleJobModalClose = () => {
    localStorage.removeItem("selectedJob");
    setIsJobModalOpen(false);
    cleanUpUrl();
  };

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <JobCard key={index} isLoading={true} />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.unique_id}
              job={job}
              handleApplyNow={handleApplyNow}
              handleApplyForMe={handleApplyForMe}
              isLoading={false}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5 text-black">
          <img
            src={EmptyState}
            alt="No jobs found"
            className="w-24 h-24 opacity-50"
          />
          <p className="mt-2 text-lg text-center font-semibold">
            Sorry, we were unable to find job openings right now.
          </p>
          <p className="text-sm text-center text-gray-400">Try again soon</p>
        </div>
      )}

      <Modal
        open={isAuthModalOpen}
        onCancel={handleAuthModalClose}
        footer={null}
        title={`Want to work as a ${selectedJob?.cleaned_job_title} at "${selectedJob?.company}"`}
      >
        <p>
          You need to be a member of <strong>Outsource Apply</strong> to apply
          for jobs. Please sign up or log in to continue.
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            className="bg-purple-800 text-white hover:!bg-purple-700"
            onClick={() => {
              // Store the selected job and current URL in localStorage
              localStorage.setItem(
                "selectedJob",
                JSON.stringify({
                  jobId: selectedJob?.unique_id,
                  title: selectedJob?.cleaned_job_title,
                  company: selectedJob?.company,
                  redirectUrl: window.location.href, // Store the current URL
                })
              );
              // Redirect to the login page
              window.location.href = `/login?redirect=${window.location.pathname}`;
            }}
          >
            Log In
          </Button>
          <Button
            className="hover:!text-purple-700 hover:!border-purple-700"
            onClick={() => {
              // Store the selected job and current URL in localStorage
              localStorage.setItem(
                "selectedJob",
                JSON.stringify({
                  jobId: selectedJob?.unique_id,
                  title: selectedJob?.cleaned_job_title,
                  company: selectedJob?.company,
                  redirectUrl: window.location.href, // Store the current URL
                })
              );
              // Redirect to the signup page
              window.location.href = `/sign-up?redirect=${window.location.pathname}`;
            }}
          >
            Sign Up
          </Button>
        </div>
      </Modal>

      <NewJobReqModal
        isOpen={isJobModalOpen}
        onClose={handleJobModalClose}
        profile={userInformation?.profile}
        job={selectedJob}
      />
    </div>
  );
};

export default JobListing;
