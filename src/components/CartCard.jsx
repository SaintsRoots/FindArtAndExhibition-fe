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
import { useFormik } from "formik";
import { addItemToCart, getCart, updateCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartCard = ({ quantity, name, price, image, productId, onRemove }) => {
  const [loading, setLoading] = useState(false);
  const [Localloading, setLocalLoading] = useState(false);
  const [LocalUpdateloading, SetLocalUpdateloading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      quantity: quantity || 1,
    },
    validate: (values) => {
      const errors = {};
      if (values.quantity <= 0) {
        errors.quantity = "Quantity must be greater than zero.";
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (values.quantity <= 0) {
        notifyError("Quantity must be greater than zero.");
        return;
      }
      try {
        setLocalLoading(true);
        await dispatch(
          addItemToCart({
            productId: productId,
            quantity: values.quantity,
          })
        ).unwrap();
        setLocalLoading(false);
        notifySuccess("Added");
        await dispatch(getCart());
      } catch (error) {
        setLocalLoading(false);
        notifyError(error.message);
      }
    },
  });

  const handleUpdateCartItem = async (productId) => {
    if (formik.values.quantity <= 0) {
      notifyError("Quantity must be greater than zero.");
      return;
    }
    try {
      SetLocalUpdateloading(true);
      await dispatch(
        updateCart({
          productId: productId,
          quantity: parseInt(formik.values.quantity),
        })
      ).unwrap();
      notifySuccess("Updated");
      await dispatch(getCart());
    } catch (error) {
      notifyError(error.message);
    } finally {
      SetLocalUpdateloading(false);
    }
  };

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
          <p
            className="flex items-center justify-center bg-slate-300 hover:bg-primary cursor-pointer rounded-md hover:text-secondary p-1"
            onClick={() => handleUpdateCartItem(productId)}
          >
            {LocalUpdateloading ? (
              <Spinner classes={` !text-white !h-4 !w-4`} />
            ) : (
              <FaMinus className="text-lg font-bold" />
            )}
          </p>
          <Input
            type="input"
            inputType="number"
            style={`!h-8 !w-16 bottom-1`}
            id="quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values.quantity}
          />
          <p
            className="flex items-center justify-center bg-slate-300 hover:bg-primary cursor-pointer rounded-md hover:text-secondary p-1"
            onClick={formik.handleSubmit}
          >
            {Localloading ? (
              <Spinner classes={` !text-white !h-4 !w-4`} />
            ) : (
              <FaPlus className="text-lg font-bold" />
            )}
          </p>
        </div>
        {formik.errors.quantity && (
            <div className="text-red-500 text-xs text-nowrap ">{formik.errors.quantity}</div>
          )}
      </div>
    </div>
  );
};

export default CartCard;
