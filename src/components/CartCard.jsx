import pix from "../assets/bg-1.jpg";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Input from "../components/form/Input";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import {
  notifySuccess,
  notifyError,
} from "../components/notifications/notification";
import Spinner from "./Spinner";

const CartCard = ({ quantity, name, price, image, productId, onRemove }) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    try {
      await onRemove(productId);
      notifySuccess(`${name} Removed`);
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex p-1 justify-between w-full bg-secondary shadow-md hover:scale-105 relative overflow-hidden rounded-xl transition ease-out duration-200 hover:shadow-md">
      <div className="w-full flex">
        <div className=" w-1/2 md:w-1/6 h-24 overflow-hidden">
          <img
            src={image || pix}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 pl-2">
          <div>
            <h1 className="text-base capitalize">{name || "The Winner"}</h1>
            <p className="font-semibold">{price || "300"} frw</p>
          </div>
          <p className="text-sm">Quantity: {quantity || 1}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <p
          className={
            loading
              ? `flex items-center justify-center bg-primary cursor-pointer rounded-md text-secondary p-1`
              : `flex items-center justify-center hover:bg-primary cursor-pointer rounded-md hover:text-secondary p-1`
          }
          onClick={handleRemove}
        >
          {loading ? (
            <Spinner classes={` !text-white !h-4 !w-4`} />
          ) : (
            <IoClose className="text-xl font-bold" />
          )}
        </p>
        <div className="flex justify-center gap-1 items-center">
          <p className="flex items-center justify-center bg-slate-300 hover:bg-primary cursor-pointer rounded-md hover:text-secondary p-1">
            <FaMinus className="text-lg font-bold" />
          </p>
          <Input
            type="input"
            inputType="number"
            style={`!h-8 !w-16 bottom-1`}
          />
          <p className="flex items-center justify-center bg-slate-300 hover:bg-primary cursor-pointer rounded-md hover:text-secondary p-1">
            <FaPlus className="text-lg font-bold" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
