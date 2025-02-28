import React, { useState } from "react";
import { MdOutlineMonochromePhotos } from "react-icons/md";
import imageCompression from "browser-image-compression";
import SectionLabel from "./Personal/SectionLabel";
import FormSection from "./Personal/FormSection";
import AccountManagement from "./Personal/AccountManagement";
import {
  useFetchProfileRequestsQuery,
  useUpdateProfileMutation,
} from "../../services/apiSlice";
import { toast } from "sonner";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const cleanBase64 = (base64String) => {
  if (!base64String || typeof base64String !== "string") return null;

  // Remove duplicate prefixes
  return base64String.replace(
    /^data:image\/(png|jpg|jpeg);base64,data:image\/(png|jpg|jpeg);base64,/,
    "data:image/jpeg;base64,"
  );
};

const Personal = () => {
  const { data, error, isLoading } = useFetchProfileRequestsQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile] = useUpdateProfileMutation();
  const [profileImageData, setProfileImageData] = useState(null);
  const [formSectionData, setFormSectionData] = useState({});

  const rawProfilePic =
    profileImageData ||
    data?.profile?.otherProfileDetails?.[0]?.profilePic ||
    null;
  const profilePic = cleanBase64(rawProfilePic);

  const handleFileChange = async (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
  
      const reader = new FileReader();
      reader.onload = async () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          const maxWidth = 500; // ✅ Limit width
          const maxHeight = 500; // ✅ Limit height
          let { width, height } = img;
  
          if (width > maxWidth || height > maxHeight) {
            const scale = Math.min(maxWidth / width, maxHeight / height);
            width *= scale;
            height *= scale;
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert to Base64
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // ✅ Reduce quality to 70%
          console.log("Optimized Base64:", compressedBase64); // ✅ Shorter Base64 string
          setProfileImageData(compressedBase64);
        };
      };
  
      reader.readAsDataURL(file);
    }
  };
  
  

  console.log("ttft", profileImageData);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    setIsEditing(false);
    const passableData = {
      profilePic:
        profileImageData || data?.profile?.otherProfileDetails?.[0]?.profilePic,
      jobTitle: formSectionData.jobTitle,
      gender: formSectionData.gender,
      dateOfBirth: formSectionData.dateOfBirth,
    };

    try {
      const response = await updateProfile(passableData).unwrap();
      console.log("Updated Profile Response:", response);
    } catch (error) {
      console.error("Update Profile Error:", error);
    }
  };

  console.log("pp", data);

  return (
    <div className="bg-white p-6 flex flex-col space-y-6">
      <div className="flex">
        <div className="w-1/2">
          <SectionLabel
            title="Personal Information"
            subtext="Manage your profile details."
          />
        </div>
        <div className="w-full">
          {/* Profile Image Uploader */}
          <div className="flex md:flex-row flex-col mb-4">
            <Avatar
              size={120}
              src={profilePic}
              icon={!profilePic && <UserOutlined />} // ✅ Show icon if no valid image
            />
            <div className="flex items-center mx-6 xl:justify-center justify-start">
              <label className="cursor-pointer xl:mb-0 mb-3 w-[180px] flex flex-col text-primaryColor border-2 rounded-xl font-semibold border-primaryColor xl:w-full py-2 px-4 md:mb-0 group text-center">
                <div className="h-full w-full text-center gap-2 flex items-center">
                  <MdOutlineMonochromePhotos className="text-[22px]" />
                  <span>Change Photo</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <p className="text-sm text-grey600 md:mb-7 mb-4">
            Your profile image must be a JPG, JPEG, or PNG and must not exceed
            2MB.
          </p>

          {/* Form Section */}
          <FormSection
            data={data}
            isEditing={isEditing}
            onFormSave={setFormSectionData}
          />

          {/* Edit & Save Buttons */}
          <div className="flex space-x-4 mt-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEditClick}
                className="text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-4 py-2"
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveClick}
                className="text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-4 py-2"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
      <AccountManagement />
    </div>
  );
};

export default Personal;
