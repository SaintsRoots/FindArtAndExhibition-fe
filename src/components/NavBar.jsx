import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaCartPlus, FaUser } from "react-icons/fa";
import { RiTelegram2Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { navLink } from "./JsonData/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { getIsAuthenticated, logout } from "../features/auth/authSlice";
import { selectAllcart } from "../features/cart/cartSlice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const allCart = useSelector(selectAllcart);
  const dispatch = useDispatch();


  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
  };

  return (
    <header className={`z-50 w-full fixed left-0 top-0 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ArtFinder
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Art & Exhibition</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLink.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-600 ${
                    isActive 
                      ? 'text-purple-600' 
                      : 'text-gray-700 hover:text-purple-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
                {isAuthenticated ? (
              <>
                {/* Wishlist */}
                <button className="p-2 bg-slate-100 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 relative">
                  <RiTelegram2Line  className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </div>
                </button>

                {/* Cart */}
                <Link to="/cart" className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 relative">
                  <FaCartPlus className="w-5 h-5" />
                  {allCart?.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {allCart.length}
                    </div>
                  )}
                </Link>

               

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-white" />
                    </div>
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm capitalize font-medium text-gray-900">{name}</p>
                        <p className="text-xs text-gray-500">{email}</p>
                      </div>
                
                      <Link to="/cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                        My Orders
                      </Link>
                      <Link to="/cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                        Favorites
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            {isAuthenticated && (
              <Link to="/cart" className="p-2 text-gray-600 hover:text-purple-600 rounded-lg transition-colors relative">
                <FaCartPlus className="w-5 h-5" />
                {allCart?.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                    {allCart.length}
                  </div>
                )}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={handleClick}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
            >
              {isOpen ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <GiHamburgerMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg">
            <div className="container mx-auto px-6 py-4">
              <nav className="flex flex-col gap-2">
                {navLink.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    onClick={handleClick}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? 'bg-purple-50 text-purple-600 border-l-4 border-purple-600' 
                          : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <FaUser className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize text-gray-900">{name}</p>
                        <p className="text-xs text-gray-500">{email}</p>
                      </div>
                    </div>
                  
                    <Link to="/cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors" onClick={handleClick}>
                      My Orders
                    </Link>
                    <Link to="/cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors" onClick={handleClick}>
                      Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={handleClick}
                      className="px-4 py-2 text-center text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={handleClick}
                      className="px-4 py-2 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default NavBar;