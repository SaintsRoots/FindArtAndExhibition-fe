import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import * as formValidation from "../validations/Index";
import { useFormik } from "formik";
const Contact = () => {

  const formik = useFormik({
    validate: formValidation.validateContactForm,
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: async (values) =>{

    },
  });
  return (
    <>
      <section className="w-full container mx-auto px-6 md:px-14 min-h-screen mt-32 rounded-lg duration-100 flex flex-col gap-8">
        <div className="w-full rounded-lg duration-100 flex justify-between gap-4 items-end flex-col lg:flex-row">
          <div className="flex flex-col gap-4 w-full">
            <p className="mt-4 text-xs">Online Art Finder and exhibition</p>
            <h1 className="text-4xl font-bold uppercase">Contact us</h1>
            <div className="flex gap-2 items-center">
              <CiLocationOn className="text-textColor" />
              <p className="text-sm">Rwanda, Kayonza-Mukarange, Nyagatovu</p>
            </div>
            <div className="flex gap-2 items-center">
              <MdPhone className="text-textColor" />
              <p className="text-sm">(+250) 784 404 173</p>
            </div>
            <div className="flex gap-2 items-center">
              <MdAlternateEmail className="text-textColor" />
              <p className="text-sm">imigongo@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 w-full rounded-3xl p-4 flex flex-row items-center gap-4 text-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full p-4 bg-slate-200 rounded-2xl gap-4">
            <div className="col-span-2 lg:col-span-1">
              <h4 className="mb-1">Names</h4>
              <Input
                type="input"
                placeholder="John doe"
                style={`bg-secondary`}
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className=" text-sm text-red-800 font-normal ">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h4 className="mb-1">Email</h4>
              <Input
                type="input"
                placeholder="Johndoe@gmial.com"
                style={`bg-secondary`}
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className=" text-sm text-red-800 font-normal ">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <div className="col-span-2">
              <h4 className="mb-1">Subject</h4>
              <Input
                type="input"
                placeholder="Subject"
                style={`bg-secondary`}
                id="subject"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.subject}
              />
              {formik.touched.subject && formik.errors.subject ? (
                <p className=" text-sm text-red-800 font-normal ">
                  {formik.errors.subject}
                </p>
              ) : null}
            </div>
            <div className="col-span-2">
              <h4 className="mb-1">Message</h4>
              <Input
                placeholder="Message"
                id="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <p className=" text-sm text-red-800 font-normal ">
                  {formik.errors.message}
                </p>
              ) : null}
            </div>
            <Button
              click={() => formik.submitForm()}
              title="Leave message"
              styles="w-full col-span-2 !scale-100"
            />
          </div>
          <div className="w-full h-full p-4 rounded-2xl justify-center items-center hidden lg:flex">
            <img src="./contact.webp" alt="Etite" className=" h-full " />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
