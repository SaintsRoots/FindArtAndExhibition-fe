import { filterBar } from "./JsonData/filterBar";
import { NavLink } from "react-router-dom";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import AllArts from "./AllArts";
import HandCraft from "./HandCraft";
import Drawings from "./Drawings";
import Painting from "./Painting";
import WallGallery from "./WallGallery";
import Architecture from "./Architecture";
import Photography from "./Photography";
import Sculpture from "./Sculpture";
import Graphics3D from "./Graphics3D";
import { useState } from "react";
const OverviewSection = () => {
  const [currentPath, setCurrentPath] = useState("All Arts");
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const renderComponent = () => {
    switch (currentPath) {
      case "All Arts":
        return <AllArts />;
      case "Hand Craft":
        return <HandCraft />;
      case "Drawings":
        return <Drawings />;
      case "Painting":
        return <Painting />;
      case "Wall Gallery":
        return <WallGallery />;
      case "Architecture":
        return <Architecture />;
      case "Photography":
        return <Photography />;
      case "Sclupture":
        return <Sculpture />;
      case "3D Graphics":
        return <Graphics3D />;
      default:
        return <AllArts />;
    }
  };
  return (
    <div className="container mx-auto px-6 md:px-12  min-h-screen flex flex-col gap-4 md:gap-14 items-start justify-center ">
      <div className="flex flex-col gap-2">
        <h1 className=" text-2xl font-bold uppercase ">ARTS OVERVIEW</h1>
        <div className="flex justify-between items-center relative">
          <ul className=" hidden lg:flex gap-4 items-center text-sm">
            {filterBar.map((item) => (
              <li key={item?.name} className=" transition-all ">
                <NavLink
                  to="#"
                  onClick={() => setCurrentPath(item.path)}
                  className={
                    currentPath === item.path
                      ? "!border-b-[1px] border-primary hover:border-textColor1 duration-100 "
                      : "text-primary hover:text-textColor1"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div
            className="lg:hidden p-2 rounded-md text-primary cursor-pointer bg-gray-100"
            onClick={handleClick}
          >
            {isOpen ? (
              <div className="flex gap-2 capitalize items-center">
                <IoClose className="text-2xl" />
                <p>{currentPath}</p>
              </div>
            ) : (
              <div className="flex gap-2 capitalize items-center">
                <RiBarChartHorizontalLine className="text-2xl" />
                <p>{currentPath}</p>
              </div>
            )}
          </div>
          {isOpen && (
            <ul
              className="shadow-md bg-secondary flex flex-col p-2 items-center gap-3 absolute top-12 left-0 w-full flex-grow "
              onClick={handleClick}
            >
              {filterBar.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to="#"
                    onClick={() => setCurrentPath(item.path)}
                    className={
                      currentPath === item.path
                        ? "!border-b-[1px] border-primary hover:border-textColor1 duration-100 "
                        : "text-primary hover:text-textColor1"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">{renderComponent()}</div>
    </div>
  );
};

export default OverviewSection;
