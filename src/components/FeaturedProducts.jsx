
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllArts,
  selectAllarts,
} from "../features/arts/artsSlice";
import { useEffect } from "react";
const FeaturedProducts = () => {
  const dispatch = useDispatch();

  const artData = useSelector(selectAllarts);

  useEffect(() => {
    dispatch(getAllArts());
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-base font-bold">Featured Products</h1>
      {artData.slice(0, 8).map((item, index) => (
        <Link
          to={`/${item.name}`}
          className="flex gap-6 items-start"
          key={index}
        >
          <div className="flex w-1/3 ">
            <img src={item.image} alt={item.name} className=" aspect-square " />
          </div>
          <div className="flex flex-col gap-6  h-full  justify-between">
            <h1 className="md:text-sm">
              <Link to={`/${item.name}`}>{item.name}</Link>
            </h1>
            <h1 className="md:text-xs">{item.price} Frw</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedProducts;
