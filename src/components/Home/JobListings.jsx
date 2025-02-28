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
          {/* Job Details */}
          <div className="flex flex-col mb-6">
            <Typography.Title level={5} className="text-xl font-bold">
              {job.cleaned_job_title.length > 30
                ? `${job.cleaned_job_title.slice(0, 30)}...`
                : job.cleaned_job_title}
            </Typography.Title>
            <Typography.Text className="text-gray-700 text-md flex gap-2 items-center ">
              <FcBriefcase /> {job.company}
            </Typography.Text>

            {/* Location */}
            <div className="flex items-center mt-2">
              <EnvironmentOutlined className="text-purple-700 mr-1" />
              <Typography.Text className="text-sm">{job.city}</Typography.Text>
            </div>
          </div>

          {/* Apply Buttons */}
          <div className="text-center flex gap-2">
            <Button
              type="primary"
              className="bg-purple-700 hover:!bg-purple-600"
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
      setFilteredJobs(data.data.slice(0, 4)); // Take only the first 4 jobs
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

  const handleApplyNow = (jobId) => {
    if (!userInformation) {
      setIsAuthModalOpen(true);
      return;
    }
    const jobToApply = filteredJobs.find((job) => job.unique_id === jobId);
    window.open(jobToApply?.incoming_click_url, "_blank");
  };

  const handleApplyForMe = (jobId) => {
    if (!userInformation) {
      setIsAuthModalOpen(true);
    } else {
      const jobToApply = filteredJobs.find((job) => job.unique_id === jobId);
      setSelectedJob(jobToApply);
      setIsJobModalOpen(true);
    }
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
          <p className="text-sm text-center text-gray-400">
             Try again soon
          </p>
        </div>
      )}

      {/* Apply For Me Modal */}
      <NewJobReqModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        profile={userInformation?.profile}
        job={selectedJob} // Pass the selected job
      />

      {/* No User Modal */}
      <Modal
        open={isAuthModalOpen}
        onCancel={() => setIsAuthModalOpen(false)}
        footer={null}
        title="Join Outsource Apply"
      >
        <p>
          You need to be a member of <strong>Outsource Apply</strong> to apply
          for jobs. Please sign up or log in to continue.
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="primary"
            onClick={() => (window.location.href = "/login")}
          >
            Log In
          </Button>
          <Button onClick={() => (window.location.href = "/signup")}>
            Sign Up
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default JobListing;