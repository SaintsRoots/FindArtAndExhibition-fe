import React, {useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Button from "../components/form/Button";
import { Link, NavLink } from "react-router-dom";
import { navLink } from "./JsonData/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { getIsAuthenticated, logout } from "../features/auth/authSlice";
import { FaCartPlus } from "react-icons/fa";
import { selectAllcart} from "../features/cart/cartSlice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const allCart = useSelector(selectAllcart);

  const dispatch = useDispatch();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="z-50 w-full fixed left-0 top-0 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 md:px-14 min-h-24 flex items-center justify-between">
        <Link to="/" className="md:block text-base md:text-lg font-bold">
          <h1 className="text-textColor">Online Art Finder and exhibition</h1>
        </Link>
        <div className="flex items-center gap-1 md:gap-4 relative">
          <ul className="hidden md:flex items-center gap-3">
            {navLink.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className="text-textColor text-sm font-sembold"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {isOpen && (
            <ul
              className="shadow-md bg-secondary flex flex-col p-2 items-center gap-3 absolute top-20 left-0 !w-full"
              onClick={handleClick}
            >
              {navLink.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className="text-slate-500 font-medium"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
          {isAuthenticated ? (
            <div className="flex w-full items-center gap-3">
              <div className="flex relative">
                <Link to="/cart">
                  <FaCartPlus className="text-primary text-2xl" />
                </Link>
                {allCart?.length > 0 && (
                  <div className="absolute -top-5 rounded-md w-full flex items-center justify-center p-1 bg-primary text-secondary -right-3 gap-1">
                    <p className="text-secondary text-xs">{allCart?.length}</p>
                  </div>
                )}
              </div>
              <Button title="Logout" click={handleLogout} />
            </div>
          ) : (
            <Button path="/login" title="Login" />
          )}
          <div
            className="md:hidden p-2 rounded-md text-secondary cursor-pointer bg-primary"
            onClick={handleClick}
          >
            {isOpen ? (
              <IoClose className="text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-2xl" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
