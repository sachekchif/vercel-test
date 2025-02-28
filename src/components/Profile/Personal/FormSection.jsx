import { useEffect, useState } from "react";
import InputField from "./InputField";

const FormSection = ({ data, isEditing, onFormSave }) => {
  const profile = data?.profile;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    if (profile) {
      const updatedData = {
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        jobTitle: profile?.otherProfileDetails[0]?.jobTitle || "",
        email: profile.email || "",
        phoneNumber: profile.phone || "",
        dateOfBirth: profile?.otherProfileDetails[0]?.dateOfBirth || "",
        gender: profile?.otherProfileDetails[0]?.gender || "",
      };
      console.log("fdsdfghj", formData);
      
      setFormData(updatedData);
      onFormSave(updatedData); // Initialize parent state
    }
  }, [profile, onFormSave]);

  const handleChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onFormSave(updatedData); // Notify parent of changes
  };

  return (
    <form>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        <InputField
          label="Firstname"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          disabled={!isEditing}
        />
        <InputField
          label="Lastname"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          disabled={!isEditing}
        />
        <InputField
          label="Job Title"
          value={formData.jobTitle}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          disabled={!isEditing}
        />
        <InputField
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={!isEditing}
        />
        <InputField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          disabled={!isEditing}
        />
        <div className="flex flex-col mb-2">
          <label
            htmlFor="dateOfBirth"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            className="rounded-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 p-2.5"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Gender
          </label>
          <select
            id="gender"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            disabled={!isEditing}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default FormSection;
