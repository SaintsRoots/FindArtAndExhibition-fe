import pic from "../assets/bg-5.jpg";
import Button from "./form/Button";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ArtsCard from "./ArtsCard";
import Skeleton from "../components/skeleton/arts.skeleton";
import NoData from "./NoData";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllArts,
  selectAllarts,
  selectArtsloading,
  selectArtsError,
} from "../features/arts/artsSlice";
import { useEffect } from "react";
const SingleArts = () => {
  const dispatch = useDispatch();

  const arts = useSelector(selectAllarts);
  const artsLoading = useSelector(selectArtsloading);
  const artsError = useSelector(selectArtsError);
  useEffect(() => {
    dispatch(getAllArts());
  }, [dispatch]);

  let content;
  if (artsError) {
    content = <p className="text-base text-red-700">Error: {artsError}</p>;
  } else if (artsLoading) {
    content = Array.from({ length: 4 }, (_, index) => <Skeleton key={index} />);
  } else if (arts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col gap-4  justify-center">
        <div className="w-full">
          <NoData />
        </div>
      </div>
    );
  } else if (arts.length > 0) {
    content = arts
      .slice(0, 4)
      .map((item, index) => (
        <ArtsCard
          key={index}
          image={item?.image}
          name={item?.name}
          price={item?.price}
          money="Frw"
        />
      ));
  }

  return (
    <div className="container min-h-screen  mx-auto px-6 md:px-14 mt-32 pb-10  flex flex-col gap-2 items-start justify-center   ">
      <p className="flex items-center ">
        Arts{" > "}Painting {" > "} Imbaho
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className="flex flex-col gap-2">
          <img src={pic} alt="" />
        </div>
        <div className="flex flex-col items-start justify-between gap-2 pl-0 lg:pl-10 ">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-2">
              <div className="flex justify-end  w-10 h-10 rounded-full p-[2px]  bg-textColor1 ">
                <img
                  src={pic}
                  alt=""
                  className=" rounded-full aspect-square "
                />
              </div>
              <p className="text-sm leading-3">Mugabo</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs">johndoe@gmail.com</p>
              <small className="text-sm">+250 784 404 173</small>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h1>
            <div className="flex gap-3 items-center">
              <div className="flex text-textColor1 ">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-sm">40 reviews</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
              vel nobis, praesentium mollitia numquam voluptatem non aspernatur
              aut error neque!
            </p>
            <h1 className="text-xl font-semibold  ">400 frw</h1>
          </div>
          <Button title={`Add to Cart`} icon={<FaCartPlus />} />
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center cursor-pointer gap-2">
          <p>Details</p>
          <p>Reviews</p>
          <p>Discusion</p>
        </div>
      </div>
      <div className=" w-full flex flex-col gap-2">
        <h2 className="text-sm font-semibold ">Related Post</h2>
        <div className=" !w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content}
        </div>
      </div>
    </div>
  );
};

export default SingleArts;
