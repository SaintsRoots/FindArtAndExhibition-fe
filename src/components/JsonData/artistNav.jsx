import {
  FaTachometerAlt,
  FaPaintBrush,
  FaShoppingCart,
  FaChartLine,
  FaUser,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

export const artistNav = [
  {
    name: "Dashboard",
    path: "/dashboard/artist",
    icon: <FaTachometerAlt />,
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
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: <FaEnvelope />,
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
