import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import {
  selectLoginStatus,
  selectLoginError,
  getIsAuthenticated,
  makeLogin,
  getIsAdmin,
  getIsArtist,
} from "../features/auth/authSlice";
import * as forValidation from "../validations/Index";
import { notifySuccess } from "../components/notifications/notification";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isAdmin = useSelector(getIsAdmin);
  const isArtist = useSelector(getIsArtist);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: forValidation.validateLogin,
    onSubmit: async (values) => {
      await dispatch(makeLogin(values));
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      notifySuccess("Login successful");
      setTimeout(() => {
        if (isAdmin) {
          navigate("/dashboard/admin");
        } else if (isArtist) {
          navigate("/dashboard/artist");
        } else {
          navigate("/");
        }
      }, 1000);
    }
  }, [isAuthenticated, isAdmin, isArtist, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-purple-100 mt-1">Sign in to your account</p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {loginError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {loginError.message ? loginError.error : loginError}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-5">
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                    Forgot password?
                  </Link>
                </div>
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
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                  Sign up here
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

export default Login;