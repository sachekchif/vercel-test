import React, { useState, useEffect } from "react";
import { EditIcon } from "../../utils/constants";

const EditRequest = ({ ModalComponent, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch user information from session storage
    const userInformation = JSON.parse(sessionStorage.getItem("userInformation"));
    const userProfile = userInformation?.profile;
    setProfile(userProfile); // Set profile data to pass to the modal
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded me-2 items-center justify-center flex px-2 py-2"
      >
       <EditIcon />
      </button>

      {/* Render the passed ModalComponent */}
      {ModalComponent && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          profile={profile} // Pass profile data if needed
          data={data} // Pass additional data prop
        />
      )}
    </>
  );
};

export default EditRequest;
