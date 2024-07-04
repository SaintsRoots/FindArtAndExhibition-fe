import { CiLocationOn } from "react-icons/ci";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import {
  makeUpdate,
  makeGetSingleUser,
  selectSingleUser,
} from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { validateUpdate } from "../../validations/Index";
import Spinner from "../Spinner";
import { notifySuccess } from "../notifications/notification";

const Profile = () => {
  const pic = localStorage.getItem("profile");
  const identity = localStorage.getItem("identity");
  const user = useSelector(selectSingleUser);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(makeGetSingleUser(identity));
  }, [dispatch, identity]);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
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
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("province", values.province);
      formData.append("district", values.district);
      formData.append("street", values.street);
      formData.append("sector", values.sector);

      const resultAction = await dispatch(
        makeUpdate({
          id: identity,
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          province: values.province,
          district: values.district,
          street: values.street,
          sector: values.sector,
        })
      );
      if (makeUpdate.fulfilled.match(resultAction)) {
        formik.resetForm();
        notifySuccess("Your Info Updated Successfully ");
        dispatch(makeGetSingleUser(identity));
        setIsUpdating(false);
      } else {
        if (resultAction.payload) {
          console.log("update Error:", resultAction.payload);
          formik.resetForm();
          setIsUpdating(false);
        } else {
          console.log("Update Error:", resultAction.error);
          formik.resetForm();
          setIsUpdating(false);
        }
      }
    },
  });

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 ">
      <div className="p-2 flex gap-2 flex-col w-full md:w-1/3 ">
        <div className="h-1/3">
          <img
            className="rounded-md object-cover aspect-square w-full h-full"
            src={pic}
            alt="Profile Pic"
          />
        </div>
        <p>
          <span className="text-sm text-gray-600">{user?.name}</span>
          <br />
          <span className="text-sm flex items-center gap-2 text-gray-600">
            <CiLocationOn className="text-primary" />{" "}
            <small>
              {user?.street || "123 Main St"}, {user?.district || "Kayonza"},
              Rwanda
            </small>
          </span>
        </p>
      </div>
      <div className="w-full flex-col gap-6 p-2 ">
        <div className="flex items-center justify-between">
          <p>Profile</p>
          <p>Personal Details</p>
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
            <div className="w-full">
              <Input
                label="Name"
                type="input"
                inputType="text"
                placeholder="Name"
                id="name"
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
            <div className="w-full">
              <Input
                label="Email"
                type="input"
                inputType="text"
                placeholder="Email Address ..."
                id="email"
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
            <div className="w-full">
              <Input
                label="Phone"
                type="input"
                inputType="text"
                placeholder="Phone"
                id="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.phone}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                label="Street"
                type="input"
                inputType="text"
                placeholder="Street"
                id="street"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.street}
              />
              {formik.touched.street && formik.errors.street && (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.street}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                label="Province"
                type="input"
                inputType="text"
                placeholder="Province"
                id="province"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.province}
              />
              {formik.touched.province && formik.errors.province && (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.province}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                label="District"
                type="input"
                inputType="text"
                placeholder="District"
                id="district"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.district}
              />
              {formik.touched.district && formik.errors.district && (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.district}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <Input
              label="Sector"
              type="input"
              inputType="text"
              placeholder="Sector"
              id="sector"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              values={formik.values.sector}
            />
            {formik.touched.sector && formik.errors.sector && (
              <p className="text-sm text-red-800 font-normal">
                {formik.errors.sector}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              label="Password"
              type="input"
              inputType="text"
              placeholder="Password"
              id="password"
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
            title={isUpdating ? <Spinner /> : `Edit`}
            styles={`!mt-2 !scale-100 `}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
