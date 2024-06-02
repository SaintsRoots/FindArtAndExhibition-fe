import { artData } from "./JsonData/artsData";
import { Link } from "react-router-dom";
const FeaturedProducts = () => {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-base font-bold">Featured Products</h1>
      {artData.slice(0, 8).map((item, index) => (
        <div className="flex gap-6 items-start" key={index}>
          <div className="flex w-1/3 ">
            <img src={item.image} alt={item.name} className=" aspect-square " />
          </div>
          <div className="flex flex-col gap-6  h-full  justify-between">
            <h1 className="md:text-sm">
              <Link to={item.name}>{item.name}</Link>
            </h1>
            <h1 className="md:text-xs">{item.price} Frw</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
