import { Outlet, NavLink, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Layout = ({ navItems, topNavProps }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav {...topNavProps} />
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <div className="bg-white w-64 border-r border-gray-200 fixed h-full hidden lg:flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Artist Dashboard</h2>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-purple-50 text-purple-700 border-l-4 border-purple-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                    onClick={() => {
                      if (link.name === "Logout") {
                        handleLogout();
                      }
                    }}
                  >
                    <div className="text-lg">{link.icon}</div>
                    <span className="font-medium">{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;