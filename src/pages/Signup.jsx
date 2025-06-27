import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { 
  User, 
  Lock, 
  Mail, 
  Image,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  makeSignup,
  selectLoginStatus,
  selectLoginError,
} from "../features/auth/authSlice";
import * as forValidation from "../validations/Index";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("img", file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      img: "",
      role: "",
    },
    validate: forValidation.validateAuth,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
      if (selectedFile) {
        formData.append("img", selectedFile);
      }

      const resultAction = await dispatch(
        makeSignup({
          name: values.name,
          img: values.img,
          email: values.email,
          password: values.password,
          role: values.role,
        })
      );

      if (makeSignup.fulfilled.match(resultAction)) {
        formik.resetForm();
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => navigate("/login"), 3000);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Join Our Community</h2>
            <p className="text-purple-100 mt-1">Create your account to get started</p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {loginError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {loginError.message ? loginError.message : loginError}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Username Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your username"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                  )}
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  I want to join as
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                  >
                    <option value="">Select your role</option>
                    <option value="Artist">Artist</option>
                    <option value="User">Art Enthusiast</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {formik.touched.role && formik.errors.role && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.role}</p>
                )}
              </div>

              {/* Profile Image Upload (Conditional) */}
              {formik.values.role === "Artist" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image
                  </label>
                  <div className="flex items-center gap-4">
                    {preview ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <label className="flex-1">
                      <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                        <span className="text-sm font-medium text-gray-700">Choose file</span>
                        <input
                          type="file"
                          id="img"
                          name="img"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Online Art Finder and Exhibition Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;