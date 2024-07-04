import {
  FaTachometerAlt,
  FaPaintBrush,
  FaShoppingCart,
  FaUser,
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
    path: "manage-artworks",
    icon: <FaPaintBrush />,
  },
  {
    name: "Orders",
    path: "orders",
    icon: <FaShoppingCart />,
  },
  {
    name: "Profile",
    path: "profile",
    icon: <FaUser />,
  },
  {
    name: "Logout",
    path: "Logout",
    icon: <RiLogoutCircleRLine />,
  },
];
