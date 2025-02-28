import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const NewModalButton = ({ buttonText, ModalComponent }) => {
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
    <div className="w-full flex">
      <button
        type="button"
        onClick={openModal}
        className="text-white w-40 justify-between bg-purple-700 hover:bg-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
      >
        {buttonText}
        <PlusOutlined />
      </button>

      {/* Render the passed ModalComponent */}
      {ModalComponent && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          profile={profile} // Pass profile data if needed
        />
      )}
    </div>
  );
};

export default NewModalButton;
