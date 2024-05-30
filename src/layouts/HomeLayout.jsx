import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between ">
      <NavBar />
      {/* <div className="container mx-auto px-6 md:px-14 mt-32"> */}
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
