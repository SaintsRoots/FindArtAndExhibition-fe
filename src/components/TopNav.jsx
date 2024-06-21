import { SiMinutemailer } from "react-icons/si";
import { FaCartPlus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { MdNotificationsActive } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { adminNav } from './JsonData/adminNav';
import { artistNav } from './JsonData/artistNav';
import IPICA from "../assets/bg-1.jpg";
const TopNav = ({ isAdmin }) => {
  const [isOpeni, setIsOpeni] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdowni = () => {
    setIsOpeni(!isOpeni);
  };
  const navItems = isAdmin ? adminNav : artistNav;

  return (
    <nav className="flex  justify-between items-center gap-2 lg:gap-6 px-2 py-3  bg-white fixed w-screen z-40 shadow ">
      <div className="lg:hidden relative inline-block text-left">
        <div>
          <button
            onClick={toggleDropdowni}
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md focus:none"
          >
            <GiHamburgerMenu className="font-[700] text-lg" />
          </button>
        </div>
        {isOpeni && (
          <div className="origin-top-right absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 ">
              <ul className="mt-3 flex flex-col">
                {navItems.map((link, index) => (
                  <li key={index} className="hover:bg-slate-100 px-2 py-2">
                    <NavLink
                      to={link.path}
                      onClick={() => setIsOpeni(false)}
                      className={(navClass) =>
                        navClass.isActive
                          ? " text-base font-semibold leading-7 text-primary flex gap-3 items-center "
                          : " text-xs font-medium  leading-7 text-black hover:text-primary flex gap-3 items-center "
                      }
                    >
                      <div className="text-primary">{link.icon}</div>
                      <span className=" text-nowrap ">{link.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:flex  items-center w-[200px]">
        <Link to="/dashboard/admin">
          <p className=" text-sm font-[700] ">Art Finder and exhibition</p>
        </Link>
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="hidden md:block lg:block text-sm font-[700] ">
          Dashboard Overview
        </p>
        <p className="block lg:hidden md:hidden "></p>
        <div className="flex gap-[5px] lg:gap-2 items-center">
          <div className="flex items-center">
            <span className=" cursor-pointer inline-flex justify-center w-fit px-2 lg:px-4 py-2 text-sm font-medium text-black hover:text-primary hover:bg-btnColor rounded-md focus:none">
              <FiSearch className=" cursor-pointer text-lg font-extrabold " />
            </span>
            <input
              type="text"
              placeholder="Search here......"
              className="focus:none px-2 py-2 w-full outline-none "
            />
          </div>
          <div className="relative inline-block text-left">
            <div>
              <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex justify-center w-fit px-2 lg:px-4 py-2 text-sm font-medium text-primary bg-btnColor rounded-md focus:none"
              >
                <MdNotificationsActive className="font-[700] text-lg" />
              </button>
            </div>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Link
                    to="Emails"
                    onClick={(prev) => !prev(isOpen)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <SiMinutemailer className="text-primary" />
                    <span>Emails</span>
                  </Link>
                  <Link
                    to="Orders"
                    onClick={(prev) => !prev(isOpen)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaCartPlus className="text-primary" />
                    <span>Orders</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/Settings">
            <img src={IPICA} alt="" className=" h-9 w-9 rounded-full " />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
