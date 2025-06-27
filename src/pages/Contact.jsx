import React from "react";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send,
} from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import {
  createMessage,
  selectContactloading,
} from "../features/contact/contactSlice";
import { useFormik } from "formik";
import * as formValidation from "../validations/Index";
import {
  notifyError,
  notifySuccess,
} from "../components/notifications/notification";
import Spinner from "../components/Spinner";

const Contact = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectContactloading);
  
  const formik = useFormik({
    validate: formValidation.validateContactForm,
    initialValues: {
      names: "",
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: async (values) => {
      try {
        await dispatch(createMessage(values));
        notifySuccess("Message sent successfully!");
        formik.resetForm();
      } catch (error) {
        notifyError(error.message);
      }
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center mt-10 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6">
              <span className="text-purple-300 text-sm font-medium"> Get In Touch</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Contact <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Us</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Have questions or feedback? We'd love to hear from you. Reach out to our team anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Information</h2>
                <p className="text-gray-600">
                  Feel free to reach out to us through any of these channels. Our team is always ready to assist you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">Rwanda, Kayonza-Mukarange, Nyagatovu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">(+250) 784 404 173</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">imigongo@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex justify-between"><span>Monday - Friday</span> <span>9:00 AM - 6:00 PM</span></p>
                  <p className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></p>
                  <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="names" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="names"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.names}
                    />
                    {formik.touched.names && formik.errors.names && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.names}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="johndoe@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subject}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? <Spinner /> : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.520109317614!2d30.123456789012345!3d-1.9876543210123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTknMTUuNiJTIDMwwrAwNyczNi4wIkU!5e0!3m2!1sen!2srw!4v1234567890123!5m2!1sen!2srw"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;