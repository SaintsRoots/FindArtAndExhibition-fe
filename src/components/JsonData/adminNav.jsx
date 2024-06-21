import {
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaPaintBrush,
  FaShoppingCart,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
export const adminNav = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Manage Artists",
    path: "/manage-artists",
    icon: <FaUser />,
  },
  {
    name: "Manage Customers",
    path: "/manage-customers",
    icon: <FaUsers />,
  },
  {
    name: "Manage Artworks",
    path: "/manage-artworks",
    icon: <FaPaintBrush />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <FaShoppingCart />,
  },
  {
    name: "Sales Reports",
    path: "/sales-reports",
    icon: <FaChartLine />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
  {
    name: "Logout",
    path: "/Logout",
    icon: <RiLogoutCircleRLine />,
  },
];
