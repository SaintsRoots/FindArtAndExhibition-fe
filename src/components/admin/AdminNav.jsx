import { NavLink } from "react-router-dom";
import { adminNav } from "../JsonData/adminNav";
import { IoMdLogOut } from "react-icons/io";


const AdminNav = () => {
  return (
    <nav className="flex flex-col justify-between bg-slate-400 h-screen ">
      <ul>
        {adminNav.map((item, index) => (
          <li key={index} >
            <NavLink to={item.path} className="flex items-center gap-3 p-2 ">
              <span className="text-primary">{item.icon}</span>
              <span className=" text-nowrap text-sm ">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <NavLink to="#" className="flex items-center gap-3 p-2 ">
        <span className="text-primary">
          <IoMdLogOut className=" text-2xl  font-black " />
        </span>
        <span className=" text-nowrap text-sm ">Logout</span>
      </NavLink>
    </nav>
  );
};

export default AdminNav;
