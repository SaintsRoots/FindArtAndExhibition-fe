import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  makeSignup,
  selectLoginStatus,
  selectLoginError,
} from "../features/auth/authSlice";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import * as forValidation from "../validations/Index";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);
  const [selectedFile, setSelectedFile] = useState(null);

  const formData = new FormData();
  if (selectedFile) {
    formData.append("profile", selectedFile);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: forValidation.validateAuth,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (selectedFile) {
        formData.append("profile", selectedFile);
      }
      const resultAction = await dispatch(
        makeSignup({
          name: values.name,
          email: values.email,
          password: values.password,
          profile: selectedFile,
        })
      );
      if (makeSignup.fulfilled.match(resultAction)) {
        formik.resetForm();
        navigate("/login");
      } else {
        if (resultAction.payload) {
          console.log("Signup Error:", resultAction.payload);
          formik.resetForm();
        } else {
          console.log("Signup Error:", resultAction.error);
          formik.resetForm();
        }
      }
    },
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.currentTarget.files[0]);
    formik.setFieldValue("profile", event.currentTarget.files[0]);
  };

  return (
    <div className="bg-secondary w-full flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="bg-white w-full md:w-1/2 h-620 rounded-sm flex justify-center items-center py-10 shadow-md">
          <form
            className="w-[95%] md:w-[85%] h-full flex flex-col justify-center items-center"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-2xl lx:text-4xl font-extrabold text-primary">
              ETITE Ltd
            </h2>
            {loginError && (
              <div className="text-sm text-red-800 font-normal mt-2">
                {loginError.message ? loginError.message : loginError}
              </div>
            )}
            <div className="mt-6 mdl:mt-[34px] w-full">
              <Input
                type="input"
                placeholder="Username"
                id="name"
                icon={<FaUser />}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="mt-6 mdl:mt-[34px] w-full">
              <Input
                type="input"
                placeholder="Email"
                id="email"
                icon={<FaEnvelope />}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mt-6 mdl:mt-[34px] w-full">
              <Input
                type="input"
                inputType="file"
                placeholder="Profile"
                accept="image/*"
                id="profile"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                // values={formik.values.profile}
              />
            </div>
            <div className="mt-6 mdl:mt-[34px] w-full">
              <Input
                type="input"
                inputType="password"
                placeholder="Password"
                id="password"
                icon={<FaLock />}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <Button
              click={formik.submitForm}
              title={loading ? "Processing..." : "Signup"}
              styles="w-full !scale-100 mt-6 mdl:mt-12 bg-primary text-white"
            />
            <div className="mt-6 flex flex-col md:flex-row gap-2 justify-between">
              <Link
                to="/forgot-password"
                className="hover:underline text-[#3558D4]"
              >
                Forgot password?
              </Link>
              <div>
                If you have an account, Login{" "}
                <Link to="/login" className="hover:underline text-[#3558D4]">
                  here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
