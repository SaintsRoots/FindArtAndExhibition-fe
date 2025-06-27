import { useState } from "react";
import { FaCartPlus, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart, getCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { NavLink } from "react-router-dom";

const ArtsCard = ({ name, price, image, money, id, available, category, description }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  const handleAddCart = async (productId) => {
    setLocalLoading(true);
    const toastId = `toast-${id}`;
    
    try {
      const resultAction = await dispatch(addItemToCart({ productId, quantity: 1 }));
      if (addItemToCart.fulfilled.match(resultAction)) {
        notifySuccess(toastId);
      } else {
        notifyError(toastId);
      }
      dispatch(getCart());
    } catch (error) {
      notifyError(toastId);
      console.error("Failed to add item to cart:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const notifySuccess = (toastId) => {
    toast.dismiss(toastId);
    toast.success("Item Added to Cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: toastId,
    });
  };

  const notifyError = (toastId) => {
    toast.dismiss(toastId);
    toast.warn("Please Login First", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: toastId,
    });
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
          {category}
        </div>
        
        {/* Quick Actions */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
          >
            {isLiked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-600" />
            )}
          </button>
          
          <NavLink
            to={`/${name}`}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
          >
            <FaEye className="text-gray-600" />
          </NavLink>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 capitalize">{name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-purple-600">
              {price.toLocaleString()} {money}
            </p>
            {available > 0 ? (
              <p className="text-xs text-gray-500">
                {available} available
              </p>
            ) : (
              <p className="text-xs text-red-500 font-medium">Sold Out</p>
            )}
          </div>
          
          <button
            onClick={() => handleAddCart(id)}
            disabled={localLoading || available <= 0}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              available <= 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {localLoading ? (
              <Spinner classes="!h-4 !w-4 !border-2" />
            ) : (
              <>
                <FaCartPlus />
                <span className="hidden sm:inline">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtsCard;