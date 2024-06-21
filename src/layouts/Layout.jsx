import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import TopNav from "../components/TopNav";

const Layout = ({ navItems, topNavProps }) => {
  return (
    <div>
      <TopNav {...topNavProps} />
      <div className="py-3 bg-white flex h-auto">
        <div className="bg-white px-4 py-2 lg:w-52 h-full fixed mt-12 shadow-lg hidden lg:flex lg:flex-col">
          <ul className="mt-3 flex flex-col">
            {navItems.map((link, index) => (
              <li key={index} className="hover:bg-slate-100 px-2 py-2">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-base font-semibold leading-7 text-primary flex gap-3 items-center"
                      : "text-xs font-medium leading-7 text-black hover:text-primary flex gap-3 items-center"
                  }
                >
                  <div className="text-primary">{link.icon}</div>
                  <span className="text-nowrap">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-screen lg:ml-52 mt-14 px-2 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
