import Input from "../form/Input";
import { FaTimes } from "react-icons/fa";
import Button from "../form/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Spinner from "../../components/Spinner";
import { notifyError, notifySuccess } from "../notifications/notification";
import { useState } from "react";
import { makeUpdate, selectLoginStatus } from "../../features/auth/authSlice";

const Modal = ({
  close,
  id,
  name,
  email,
  img,
  phone,
  province,
  district,
  sector,
  street,
  password,
}) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const loading = useSelector(selectLoginStatus);
  const handleFileChange = (event) => {
    setSelectedFile(event.currentTarget.files[0]);
    formik.setFieldValue("img", event.currentTarget.files[0]);
  };

  const [isOpen, setOpen] = useState(true);

  const formik = useFormik({
    initialValues: {
      id,
      name: name || "",
      email: email || "",
      password: password || "",
      img: img || null,
      phone: phone || "",
      province: province || "",
      district: district || "",
      sector: sector || "",
      street: street || "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("province", values.province);
      formData.append("district", values.district);
      formData.append("sector", values.sector);
      formData.append("street", values.street);
      if (selectedFile) {
        formData.append("img", selectedFile);
      }
      const resultAction = await dispatch(
        makeUpdate({
          id: id,
          name: values.name,
          phone: values.phone,
          password: values.password,
          province: values.province,
          email: values.email,
          district: values.district,
          sector: values.sector,
          street: values.street,
          img: selectedFile,
        })
      );
      if (makeUpdate.fulfilled.match(resultAction)) {
        formik.resetForm();
        notifySuccess("Updated Success");
        setOpen(false);
        close();
      } else {
        if (resultAction.payload) {
          notifyError(resultAction.payload.error || "Failed to update ");
        } else {
          notifyError("Failed to update ");
        }
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen min-h-screen z-50 flex justify-center items-center bg-primary/50 backdrop-blur-sm">
      <div className="flex flex-col p-4 xl:p-4 gap-4 justify-start items-start w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-slate-100 rounded-3xl duration-300">
        <div className="flex justify-end w-full p-4" onClick={close}>
          <span
            className="p-2 bg-primary rounded-md cursor-pointer text-secondary"
            onClick={close}
          >
            <FaTimes onClick={close} />
          </span>
        </div>
        <form action="" onSubmit={formik.handleSubmit} className="w-full">
          <div className="w-full">
            <label htmlFor="">Add Image</label>
            <div className="w-full h-16 relative border border-dashed border-blue-800 rounded-md">
              <Input
                type="input"
                inputType="file"
                id="img"
                style={`!absolute !w-full !h-full !top-0 !left-0 `}
                accept="image/*"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
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
              placeholder="Sector"
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
            title={loading ? <Spinner /> : `Edit`}
            styles={`!mt-2 !scale-100 `}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
