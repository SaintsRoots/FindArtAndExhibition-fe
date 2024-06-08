import CartCard from "../components/CartCard";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllcart,
  selectTotalPrice,
  selectTotalItems,
  getCart,
  selectcartloading,
  selectcartError,
} from "../features/cart/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectAllcart);
  const totalPrice = useSelector(selectTotalPrice);
  const totalItems = useSelector(selectTotalItems);
  const loading = useSelector(selectcartloading);
  const error = useSelector(selectcartError);
  console.log(loading,error)

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  return (
    <div className="container mx-auto px-6 md:px-14 min-h-screen pt-14 pb-14 mt-14  flex flex-col gap-12 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Summary Order</h1>
            <p>
              Check your item and select your shipping for better experience
              order item
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {cart?.map((cartItem, index) => (
              <CartCard
                name={cartItem?.product?.name}
                price={cartItem?.price}
                quantity={cartItem?.quantity}
                image={cartItem?.product?.image}
                key={index}
              />
            ))}
          </div>
        </div>
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
              className={`relative text-primary duration-100 outline-none justify-between flex items-center gap-6 p-3 w-full rounded-md font-semibold border-2 hover:border-primary`}
            >
              <select className="w-full border-0 outline-none" id="role">
                <option>Choose Payment Type</option>
                <option value="MTN">MTN Mobile Money</option>
                <option value="AITEL">AITEL Mobile Money</option>
              </select>
            </div>
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
            <Button title={`Pay ${totalPrice} frw`} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
