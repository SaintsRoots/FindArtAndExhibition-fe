import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeLayout from "../layouts/HomeLayout";
import DashLayout from "../layouts/DashLayout";
import Home from "../pages/Home";
import NotFound from "../not-found";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Forgot from "../pages/Forgot";
import About from "../pages/About";
import ProtectedRoute from "../components/ProtectedRoute";
import Blog from "../pages/Blog";
import Signup from "../pages/Signup";
import Dashboard from "../components/dashboard/Dashboard";
import SingleArts from "../components/SingleArts";
import Artist from "../components/Artist";
import Shop from "../components/Shop";
import SingleBlog from "../components/SingleBlog";
import Cart from "../pages/Cart";
import Admin from "../components/admin/Admin";
import Artistlayout from "../layouts/Artistlayout";
import ManageArt from "../components/dashboard/ManageArt";

const AppRoutes = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/:name" element={<SingleArts />} />
          <Route path="/blog/:name" element={<SingleBlog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <DashLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/dashboard/artist"
          element={
            <ProtectedRoute>
              <Artistlayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-artworks" element={<ManageArt />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
