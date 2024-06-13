import Button from "./form/Button";
import { FaCartPlus, FaStar } from "react-icons/fa";
import ArtsCard from "./ArtsCard";
import Skeleton from "../components/skeleton/arts.skeleton";
import Skeletn from "./skeleton/single.skeleton";
import NoData from "./NoData";
import {
  notifySuccess,
  notifyError,
} from "../components/notifications/notification";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllArts,
  selectAllarts,
  selectArtsloading,
  selectArtsError,
  getArtsByName,
  selectCurrentArt,
} from "../features/arts/artsSlice";

import { addItemToCart } from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleArts = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const [localLoading, setLocalLoading] = useState(false);

  const single = useSelector(selectCurrentArt);
  const arts = useSelector(selectAllarts);
  const artsLoading = useSelector(selectArtsloading);
  const artsError = useSelector(selectArtsError);

  const handleAddItemToCart = async (productId) => {
    setLocalLoading(true);
    try {
      await dispatch(addItemToCart({ productId, quantity: 1 }));
      notifySuccess("Item Added Well!");
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getAllArts());
    if (name) {
      dispatch(getArtsByName(name));
    }
  }, [name, dispatch]);

  let CurrentContent;
  if (artsError) {
    CurrentContent = (
      <p className="text-base text-red-700">Error: {artsError}</p>
    );
  } else if (artsLoading) {
    CurrentContent = Array.from({ length: 1 }, (_, index) => (
      <Skeletn key={index} />
    ));
  } else if (arts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col gap-4  justify-center">
        <div className="w-full">
          <NoData />
        </div>
      </div>
    );
  } else if (arts.length > 0) {
    CurrentContent = (
      <>
        <p className="flex items-center ">
          Arts{" > "}
          {single?.category} {" > "} {single?.name}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div className="flex flex-col gap-2">
            <img
              src={single?.image}
              alt={single?.name}
              className=" aspect-square !object-cover "
            />
          </div>
          <div className="flex flex-col items-start justify-between gap-2 pl-0 lg:pl-10 ">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center gap-2">
                <div className="flex justify-end  w-10 h-10 rounded-full p-[2px]  bg-textColor1 ">
                  <img
                    src={single?.owner?.profile}
                    alt={single?.owner?.name}
                    className=" rounded-full aspect-square "
                  />
                </div>
                <p className="text-sm leading-3">{single?.owner?.name}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs">{single?.owner?.email}</p>
                <small className="text-sm">
                  +25{single?.owner?.phone || "0 729 800 742"}
                </small>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold ">{single?.name}</h1>
              <div className="flex gap-3 items-center">
                <div className="flex text-textColor1 ">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-sm">{single?.reviews || 50} reviews</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p>{single?.description}</p>
              <h1 className="text-xl font-semibold  ">{single?.price} frw</h1>
            </div>
            <Button
              click={() => handleAddItemToCart(single?._id)}
              title={localLoading ? `Wait a bit ..` : `Add to Cart`}
              icon={<FaCartPlus />}
            />
          </div>
        </div>
      </>
    );
  }

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
          id={item?._id}
        />
      ));
  }

  return (
    <div className="container min-h-screen  mx-auto px-6 md:px-14 mt-32 pb-10  flex flex-col gap-2 items-start justify-center   ">
      {CurrentContent}

      <div className="mt-8">
        <div className="flex items-center cursor-pointer gap-2">
          <p>Details</p>
          <p>Reviews</p>
          <p>Discussion</p>
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
