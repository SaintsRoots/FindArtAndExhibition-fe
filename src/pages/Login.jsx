import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import { FaUser, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginStatus,
  selectLoginError,
  getIsAuthenticated,
  makeLogin,
  getIsAdmin,
} from "../features/auth/authSlice";
import * as forValidation from "../validations/Index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isAdmin = useSelector(getIsAdmin);
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
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="bg-secondary w-full min-h-screen mt-8 flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="bg-white w-full md:w-1/2 h-620 rounded-sm flex justify-center items-center py-10 shadow-md">
          <form
            className="w-[95%] md:w-[85%] h-full flex flex-col justify-center items-center"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-2xl lx:text-4xl font-extrabold text-primary">
              Online Art Finder and exhibition
            </h2>
            {loginError && (
              <div className="text-sm text-red-800 font-normal mt-2">
                {loginError.message ? loginError.error : loginError}
              </div>
            )}
            <div className="mt-6 mdl:mt-[34px] w-full">
              <Input
                type="input"
                placeholder="Email"
                id="email"
                icon={<FaUser />}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <div className="mt-6 mdl:mt-[34px] w-full">
              <Input
                type="input"
                placeholder="Password"
                inputType="password"
                id="password"
                icon={<FaLock />}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <Button
              click={() => formik.submitForm()}
              title={loading ? "Logging in..." : "Login"}
              styles={`w-full !scale-100 mt-6 mdl:mt-12 bg-primary text-white`}
            />
            <div className="mt-6 flex flex-col md:flex-row gap-2 justify-between">
              <Link
                to="/forgot-password"
                className="hover:underline text-[#3558D4]"
              >
                Forgot password ?
              </Link>
              <div>
                If you dont have account signup{" "}
                <Link to="/signup" className="hover:underline text-[#3558D4]">
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

export default Login;
