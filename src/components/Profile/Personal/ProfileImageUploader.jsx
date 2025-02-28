import React from "react";
import { MdOutlineMonochromePhotos } from "react-icons/md";
import Avatar from "./Avatar"; // Ensure Avatar is correctly imported

const ProfileImageUploader = ({ selectedImage, onFileChange, data }) => {
  return (
    <div className="flex md:flex-row flex-col mb-4">
      <Avatar
        size="lg"
        className="h-[120px] w-[120px]"
        src={selectedImage || (data?.image && `data:image/jpeg;base64,${data?.image}`)}
      />
      <div className="flex items-center mx-6 xl:justify-center justify-start">
        <label className="cursor-pointer xl:mb-0 mb-3 w-[180px] flex flex-col text-primaryColor border-2 rounded-xl font-semibold border-primaryColor xl:w-full py-2 px-4 md:mb-0 group text-center">
          <div className="h-full w-full text-center gap-2 flex items-center">
            <MdOutlineMonochromePhotos className="text-[22px]" />
            <span>Change Photo</span>
          </div>
          <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
