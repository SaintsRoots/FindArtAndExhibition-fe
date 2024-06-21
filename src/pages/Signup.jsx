import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FaUserTie } from "react-icons/fa";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Spinner from "../components/Spinner";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validate: forValidation.validateAuth,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);

      const resultAction = await dispatch(
        makeSignup({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        })
      );
      if (makeSignup.fulfilled.match(resultAction)) {
        formik.resetForm();
        notify();
        // set timeout
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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

  const notify = () => {
    toast.success("Application Succesfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <div className="bg-secondary w-full min-h-screen mt-12 flex flex-col justify-center items-center">
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
                {loginError.message ? loginError.message : loginError}
              </div>
            )}
            <div className="flex items-center gap-2 w-full">
              <div className="mt-6 mdl:mt-[34px] w-full">
                <Input
                  type="input"
                  label="Username"
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
                  label="Email"
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
            </div>
            <div className="mt-6 mdl:mt-[34px] w-full flex flex-col gap-2 ">
              <h1 className="text-sm font-medium">User Type</h1>
              <div
                className={`relative text-primary  duration-100 outline-none justify-between flex items-center gap-6 p-3  w-full rounded-md font-semibold border-2 hover:border-primary`}
              >
                <FaUserTie />
                <select
                  className="w-full border-0 outline-none"
                  id="role"
                  icon={<FaLock />}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values.role}
                >
                  <option>Choose Your Role</option>
                  <option value="Artist">Artist</option>
                  <option value="User">Customer</option>
                </select>
              </div>
              {formik.touched.role && formik.errors.role && (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.role}
                </p>
              )}
            </div>
            <div className="mt-6 mdl:mt-[34px] w-full">
              <Input
                type="input"
                label="Password"
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
              title={loading ? <Spinner classes={` !text-white !h-6 !w-6`} /> : "Signup"}
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
