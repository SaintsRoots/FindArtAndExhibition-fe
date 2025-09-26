import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { validateArtsForm } from "../../validations/Index";
import { createArts } from "../../features/arts/artsSlice";
import Spinner from "../../components/Spinner";
import { notifyError, notifySuccess } from "../notifications/notification";
import { useState } from "react";

const CreateArtModal = ({ close, message, title = "Add New Artwork" }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setIsloading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedFile(file);
      formik.setFieldValue("image", file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    validate: validateArtsForm,
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      available_arts: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("available_arts", values.available_arts);
      formData.append("description", values.description);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      setIsloading(true);

      const resultAction = await dispatch(
        createArts({
          name: values.name,
          price: values.price,
          category: values.category,
          description: values.description,
          available_arts: values.available_arts,
          image: selectedFile,
        })
      );

      if (createArts.fulfilled.match(resultAction)) {
        formik.resetForm();
        setImagePreview(null);
        setSelectedFile(null);
        setIsloading(false);

        notifySuccess("Artwork published successfully!");
        close();
      } else {
        if (resultAction.payload) {
        setIsloading(false);

          notifyError(
            resultAction.payload.error || "Failed to publish artwork"
          );
        } else {
        setIsloading(false);

          notifyError("Failed to publish artwork");
        }
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600">
                Share your masterpiece with the world
              </p>
            </div>
            <button
              onClick={close}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
          {message && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {message}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Artwork Image *
            </label>
            <div className="flex items-center gap-6">
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
                  />
                </div>
              )}
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">
                      {imagePreview
                        ? "Change image"
                        : "Click to upload artwork image"}
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
                {formik.touched.image && formik.errors.image ? (
                  <p className="text-sm text-red-600 mt-1">
                    {formik.errors.image}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Artwork Name *
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="e.g., Ethereal Dreams"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price (RWF) *
              </label>
              <input
                type="number"
                id="price"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="e.g., 2400"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.price}
                </p>
              ) : null}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <option value="">Select a category</option>
                <option value="Painting">Painting</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Photography">Photography</option>
                <option value="Architecture">Architecture</option>
                <option value="Drawings">Drawings</option>
                <option value="Graphics3D">Graphics 3D</option>
                <option value="Hand Craft">Hand Craft</option>
                <option value="Wall Gallery">Wall Gallery</option>
                <option value="Abstract">Abstract</option>
                <option value="Landscape">Landscape</option>
                <option value="Portrait">Portrait</option>
                <option value="Street Art">Street Art</option>
              </select>
              {formik.touched.category && formik.errors.category ? (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.category}
                </p>
              ) : null}
            </div>

            {/* Available Quantity */}
            <div>
              <label
                htmlFor="available_arts"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Available Quantity *
              </label>
              <input
                type="number"
                id="available_arts"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="e.g., 1"
                min="1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.available_arts}
              />
              {formik.touched.available_arts && formik.errors.available_arts ? (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.available_arts}
                </p>
              ) : null}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Describe your artwork, inspiration, techniques used..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.description}
              </p>
            ) : null}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={close}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner classes="text-white h-5 w-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Artwork"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArtModal;
