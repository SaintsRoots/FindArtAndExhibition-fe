import Input from "../form/Input";
import { FaTimes } from "react-icons/fa";
import Button from "../form/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { validateArtsForm } from "../../validations/Index";
import { updateArts, selectArtsloading } from "../../features/arts/artsSlice";
import Spinner from "../../components/Spinner";
import { notifyError, notifySuccess } from "../notifications/notification";
import { useState } from "react";

const Modal = ({
  close,
  message,
  id,
  name,
  description,
  image,
  price,
  category,
  available_arts,
}) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const loading = useSelector(selectArtsloading);
  const handleFileChange = (event) => {
    setSelectedFile(event.currentTarget.files[0]);
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  const [isOpen, setOpen] = useState(true);

  const formik = useFormik({
    validate: validateArtsForm,
    initialValues: {
      id,
      name: name || "",
      description: description || "",
      image: image || null,
      price: price || "",
      category: category || "",
      available_arts: available_arts || "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("available_arts", values.available_arts);
      formData.append("description", values.description);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      const resultAction = await dispatch(
        updateArts({
          id: id,
          name: values.name,
          price: values.price,
          category: values.category,
          description: values.description,
          available_arts: values.available_arts,
          image: selectedFile,
        })
      );
      if (updateArts.fulfilled.match(resultAction)) {
        formik.resetForm();
        notifySuccess("Uploaded Success");
        setOpen(false);
        close();
      } else {
        if (resultAction.payload) {
          notifyError(resultAction.payload.error || "Failed to upload arts");
        } else {
          notifyError("Failed to upload arts");
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
        <form
          action=""
          className="w-full flex flex-col gap-2"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="w-full text-center capitalize text-2xl font-bold text-primary">
            {name}
          </h1>
          {message && <div className="text-center text-red-500">{message}</div>}
          <div className="w-full">
            <label htmlFor="">Add Image</label>
            <div className="w-full h-16 relative border border-dashed border-blue-800 rounded-md">
              <Input
                type="input"
                inputType="file"
                id="image"
                style={`!absolute !w-full !h-full !top-0 !left-0 `}
                accept="image/*"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.image && formik.errors.image ? (
              <p className="text-sm text-red-800 font-normal">
                {formik.errors.image}
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
            <div>
              <Input
                type="input"
                inputType="text"
                placeholder="Name Of Arts"
                label={`Name Of Arts`}
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <Input
                type="input"
                inputType="number"
                placeholder="Price Of Arts"
                label={`Price Of Arts`}
                id="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.price}
                </p>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
            <div>
              <Input
                type="input"
                inputType="text"
                placeholder="Category Of Arts"
                label={`Category Of Arts`}
                id="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.category}
              />
              {formik.touched.category && formik.errors.category ? (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.category}
                </p>
              ) : null}
            </div>
            <div>
              <Input
                type="input"
                inputType="number"
                placeholder="Available Of Arts"
                label={`Available Of Arts`}
                id="available_arts"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.available_arts}
              />
              {formik.touched.available_arts && formik.errors.available_arts ? (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.available_arts}
                </p>
              ) : null}
            </div>
          </div>
          <div>
            <Input
              type="input"
              placeholder="Description Of Arts"
              label={`Description Of Arts`}
              id="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              values={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <p className="text-sm text-red-800 font-normal">
                {formik.errors.description}
              </p>
            ) : null}
          </div>

          <Button
            title={loading ? "" : `Update`}
            styles={`!scale-100 bg-primary text-secondary`}
            icon={loading ? <Spinner classes={`!h-6 !w-6 !text-white`} /> : ""}
            click={formik.submitForm}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
