import { CiLocationOn } from "react-icons/ci";
import { Camera, Save, X } from "lucide-react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  makeUpdate,
  makeGetSingleUser,
  selectSingleUser,
} from "../../features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { validateUpdate } from "../../validations/Index";
import Spinner from "../Spinner";
import { notifySuccess, notifyError } from "../notifications/notification";

const Profile = () => {
  const pic = localStorage.getItem("profile");
  const identity = localStorage.getItem("identity");
  const user = useSelector(selectSingleUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(pic);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(makeGetSingleUser(identity));
  }, [dispatch, identity]);

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        // Here you would typically upload the image to your server
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      phone: user?.phone || "",
      province: user?.province || "",
      district: user?.district || "",
      street: user?.street || "",
      sector: user?.sector || "",
    },
    enableReinitialize: true,
    validate: validateUpdate,
    onSubmit: async (values) => {
      setIsUpdating(true);
      try {
        const resultAction = await dispatch(
          makeUpdate({
            id: identity,
            name: values.name,
            email: values.email,
            password: values.password || undefined, // Only send if changed
            phone: values.phone,
            province: values.province,
            district: values.district,
            street: values.street,
            sector: values.sector,
          })
        );
        
        if (makeUpdate.fulfilled.match(resultAction)) {
          notifySuccess("Profile updated successfully!");
          dispatch(makeGetSingleUser(identity));
          setIsEditing(false);
          // Clear password field after successful update
          formik.setFieldValue('password', '');
        } else {
          throw new Error(resultAction.payload || resultAction.error);
        }
      } catch (error) {
        notifyError("Failed to update profile. Please try again.");
        console.error("Update Error:", error);
      } finally {
        setIsUpdating(false);
      }
    },
  });

  const handleCancel = () => {
    setIsEditing(false);
    formik.resetForm();
    setProfileImage(pic);
    // Clear password field when canceling
    formik.setFieldValue('password', '');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-purple-100">Manage your personal information and preferences</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Image Section */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="relative inline-block">
                  <img
                    className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg mx-auto cursor-pointer hover:opacity-90 transition-opacity"
                    src={profileImage}
                    alt="Profile"
                    onClick={handleImageClick}
                  />
                  {isEditing && (
                    <div className="absolute bottom-2 right-2 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700 transition-colors">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                
                <h2 className="text-xl font-semibold text-gray-900 mt-4">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                
                <div className="flex items-center justify-center gap-1 mt-2 text-gray-500">
                  <CiLocationOn className="w-4 h-4" />
                  <span className="text-sm">
                    {user?.street || "123 Main St"}, {user?.district || "Kayonza"}, Rwanda
                  </span>
                </div>

                {/* Edit Toggle Button */}
                {!isEditing ? (
                  <Button
                    title="Edit Profile"
                    click={() => setIsEditing(true)}
                    styles="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  />
                ) : (
                  <div className="flex gap-2 mt-4">
                    <Button
                      title={isUpdating ? <Spinner /> : "Save Changes"}
                      click={formik.handleSubmit}
                      styles="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      icon={<Save className="w-4 h-4" />}
                    />
                    <Button
                      title="Cancel"
                      click={handleCancel}
                      styles="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                      icon={<X className="w-4 h-4" />}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Form Section */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Input
                        label="Full Name"
                        type="input"
                        inputType="text"
                        placeholder="Your full name"
                        id="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        disabled={!isEditing}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        label="Email Address"
                        type="input"
                        inputType="email"
                        placeholder="your.email@example.com"
                        id="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        disabled={!isEditing}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        label="Phone Number"
                        type="input"
                        inputType="tel"
                        placeholder="+250 XXX XXX XXX"
                        id="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        disabled={!isEditing}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="text-sm text-red-600 mt-1">{formik.errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        label="Street Address"
                        type="input"
                        inputType="text"
                        placeholder="Street name and number"
                        id="street"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.street}
                        disabled={!isEditing}
                      />
                      {formik.touched.street && formik.errors.street && (
                        <p className="text-sm text-red-600 mt-1">{formik.errors.street}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        label="Province"
                        type="input"
                        inputType="text"
                        placeholder="Province"
                        id="province"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.province}
                        disabled={!isEditing}
                      />
                      {formik.touched.province && formik.errors.province && (
                        <p className="text-sm text-red-600 mt-1">{formik.errors.province}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        label="District"
                        type="input"
                        inputType="text"
                        placeholder="District"
                        id="district"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.district}
                        disabled={!isEditing}
                      />
                      {formik.touched.district && formik.errors.district && (
                        <p className="text-sm text-red-600 mt-1">{formik.errors.district}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <Input
                      label="Sector"
                      type="input"
                      inputType="text"
                      placeholder="Sector"
                      id="sector"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.sector}
                      disabled={!isEditing}
                    />
                    {formik.touched.sector && formik.errors.sector && (
                      <p className="text-sm text-red-600 mt-1">{formik.errors.sector}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <Input
                      label="New Password (leave blank to keep current)"
                      type="input"
                      inputType="password"
                      placeholder="Enter new password"
                      id="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={!isEditing}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;