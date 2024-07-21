import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import CartCard from "../components/CartCard";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import Modal from "../components/CartModel";
import {
  selectAllcart,
  selectTotalPrice,
  selectTotalItems,
  getCart,
  removeItemFromCart,
  selectCartId,
} from "../features/cart/cartSlice";
import { makeOrders } from "../features/orders/ordersSlice";
import { validateCheckout } from "../validations/Index";
import {
  notifyError,
  notifySuccess,
} from "../components/notifications/notification";
import Spinner from "../components/Spinner";
import CartImage from "../assets/cart.jpg";
import FlutterwavePayment from "../components/flutterWave/FlutterwavePayment";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectAllcart);
  const totalPrice = useSelector(selectTotalPrice);
  const totalItems = useSelector(selectTotalItems);
  const cartId = useSelector(selectCartId);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const phone = localStorage.getItem("phone");

  const formik = useFormik({
    initialValues: {
      shippingAddress: "",
    },
    validate: validateCheckout,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await dispatch(
          makeOrders({
            cartId: cartId,
            shippingAddress: values.shippingAddress,
          })
        ).unwrap();
        setLoading(false);
        notifySuccess(`Successfully ordered ${totalItems} items`);
        setIsModalOpen(true);  // Open the modal after a successful order
        await dispatch(getCart());
        formik.resetForm();
      } catch (error) {
        setLoading(false);
        notifyError(error.message);
      }
    },
  });

  return (
    <div className="container mx-auto px-6 md:px-14 min-h-screen pt-14 pb-14 mt-14 flex flex-col gap-12 justify-center">
      {isModalOpen && <Modal close={() => setIsModalOpen(false)}  email={email} />}
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
              <img src={CartImage} alt="Cart items_image" />
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
              styles={`!p-0`}
              click={formik.handleSubmit}
              title={
                loading ? (
                  <Spinner classes="!h-10" />
                ) : (
                  <FlutterwavePayment
                    amount={totalPrice}
                    email={email}
                    phone={phone}
                    name={name}
                  />
                )
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
