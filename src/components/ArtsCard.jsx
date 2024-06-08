import { useState } from "react";
import Button from "../components/form/Button";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const ArtsCard = ({ name, price, image, money, id }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddCart = async (productId) => {
    setLocalLoading(true);
    const toastId = `toast-${id}`; // Unique toast ID based on product ID
    try {
      await dispatch(addItemToCart({ productId, quantity: 1 })).unwrap();
      notifySuccess(toastId);
    } catch (error) {
      notifyError(toastId);
      console.error("Failed to add item to cart:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const notifySuccess = (toastId) => {
    toast.dismiss(toastId); // Dismiss any existing toast with the same ID
    toast.success("Art Added Well!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      toastId: toastId, // Use the unique toast ID
    });
  };

  const notifyError = (toastId) => {
    toast.dismiss(toastId); // Dismiss any existing toast with the same ID
    toast.warn("Please First Login", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      toastId: toastId, // Use the unique toast ID
    });
  };

  return (
    <div className="flex flex-col gap-4 relative group shadow-md hover:scale-105 transition ease-out duration-200 hover:shadow-md">
      <div className="max-h-[300px] overflow-hidden">
        <img src={image} alt={name} className="aspect-square duration-100 " />
      </div>
      <div className="flex justify-between items-start p-3 gap-2">
        <div className="flex flex-col leading-6">
          <h1 className="text-sm font-normal text-gray-500 text-nowrap capitalize">
            {name}
          </h1>
          <p className="text-sm text-slate-700 font-light capitalize">
            {price} {money}
          </p>
        </div>
        <Button
          title={localLoading ? `Wait A bit ..` : ``}
          click={() => handleAddCart(id)}
          icon={localLoading ? ` ` : <FaCartPlus />}
          styles={`text-nowrap`}
        />
      </div>
      <div className="buttons-container flex h-[80%] pb-3 w-full justify-center transition ease-out duration-200 absolute left-0 items-end">
        <Button
          title={`Quick View`}
          path={`/${name}`}
          styles={`text-nowrap bg-white text-textColor !rounded-full`}
        />
      </div>
    </div>
  );
};

export default ArtsCard;
