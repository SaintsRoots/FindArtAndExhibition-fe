import CartCard from "../components/CartCard";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllcart,
  selectTotalPrice,
  selectTotalItems,
  getCart,
  removeItemFromCart,
  selectCartId,
  
} from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { makeOrders } from "../features/orders/ordersSlice";
import { validateCheckout } from "../validations/Index";
import {
  notifyError,
  notifySuccess,
} from "../components/notifications/notification";
import Spinner from "../components/Spinner";

import CartImage from "../assets/cart.jpg";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectAllcart);
  const totalPrice = useSelector(selectTotalPrice);
  const totalItems = useSelector(selectTotalItems);
  const cartId = useSelector(selectCartId);

  const [loading, setLoading] = useState(false);

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeItemFromCart({ productId })).unwrap();
      dispatch(getCart());
    } catch (error) {
      console.error("Failed to remove item from cart: ", error);
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const formik = useFormik({
    initialValues: {
      paymentMethod: "",
      shippingAddress: "",
    },
    validate: validateCheckout,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await dispatch(
          makeOrders({
            cartId: cartId,
            paymentMethod: values.paymentMethod,
            shippingAddress: values.shippingAddress,
          })
        ).unwrap();
        setLoading(false);
        notifySuccess(`Successfully ordered ${totalItems} items`);
        formik.resetForm();
        await dispatch(getCart());
      } catch (error) {
        setLoading(false);
        notifyError(error.message);
      }
    },
  });

  return (
    <div className="container mx-auto px-6 md:px-14 min-h-screen pt-14 pb-14 mt-14 flex flex-col gap-12 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Summary Order</h1>
            <p>
              Check your item and select your shipping for better experience
              order item
            </p>
          </div>
          {cart && cart.length > 0 ? (
            <div className="flex flex-col gap-2">
              {cart?.map((cartItem, index) => (
                <CartCard
                  name={cartItem?.product?.name}
                  price={cartItem?.price}
                  quantity={cartItem?.quantity}
                  image={cartItem?.product?.image}
                  productId={cartItem?.product?._id}
                  key={index}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p>
                No Carts Items Available Just Go To{" "}
                <a href="/shop" className="text-primary font-bold ">
                  Shop
                </a>{" "}
                and Add yours
              </p>
              <image
                src={CartImage}
                alt={`Cart Image`}
                className=" object-cover "
              />
            </div>
          )}
        </div>
        {cart && cart.length > 0 ? (
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4 p-1">
            <div>
              <h1 className="text-2xl font-semibold">Payment Details</h1>
              <p>
                Complete your Purchase item by providing your payment details
                Order here
              </p>
            </div>
            <Input
              label={`Name`}
              inputType={`text`}
              type={`input`}
              values={name}
            />
            <Input
              label={`Email Address`}
              inputType={`text`}
              type={`input`}
              values={email}
            />
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-sm font-medium">Payment Type</h1>
              <div
                className={`relative text-primary duration-100 outline-none flex flex-col gap-6 p-3 w-full rounded-md font-semibold border-2 hover:border-primary`}
              >
                <select
                  className="w-full border-0 text-xs outline-none"
                  id="paymentMethod"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values.paymentMethod}
                >
                  <option>Choose Payment Type</option>
                  <option value="MTN">MTN Mobile Money</option>
                  <option value="AITEL">AITEL Mobile Money</option>
                </select>
                {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                  <p className="text-sm text-red-800 font-normal">
                    {formik.errors.paymentMethod}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="w-full">
              <Input
                label={`Shipping Address`}
                inputType={`text`}
                placeholder={`shippingAddress`}
                type={`input`}
                id={`shippingAddress`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.shippingAddress}
              />
              {formik.touched.shippingAddress &&
              formik.errors.shippingAddress ? (
                <p className="text-sm text-red-800 font-normal">
                  {formik.errors.shippingAddress}
                </p>
              ) : null}
            </div>
            <div>
              <div className="flex justify-between items-center">
                <p>Total Items:</p>
                <p className="text-sm text-slate-600">{totalItems} arts</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Total:</p>
                <p className="text-sm text-slate-600">{totalPrice} frw</p>
              </div>
            </div>
            <Button
              click={formik.handleSubmit}
              title={
                loading ? <Spinner classes={`!h-4`} /> : `Pay ${totalPrice} frw`
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
