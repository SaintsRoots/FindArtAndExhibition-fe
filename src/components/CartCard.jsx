import { 
  Plus, 
  Minus, 
  Trash2
} from "lucide-react";
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
  const [localLoading, setLocalLoading] = useState(false);
  const [localUpdateLoading, setLocalUpdateLoading] = useState(false);
  const dispatch = useDispatch();

  const defaultImage = "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop";

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
      setLocalUpdateLoading(true);
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
      setLocalUpdateLoading(false);
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

  const handleIncrement = () => {
    formik.setFieldValue('quantity', formik.values.quantity + 1);
    formik.handleSubmit();
  };

  const handleDecrement = () => {
    if (formik.values.quantity > 1) {
      formik.setFieldValue('quantity', formik.values.quantity - 1);
      handleUpdateCartItem(productId);
    }
  };

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl bg-gray-100 flex-shrink-0">
          <img
            src={image || defaultImage}
            alt={name}
            className="w-24 h-24 object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {name || "Artwork"}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-purple-600">
                  {price || "300"} 
                </span>
                <span className="text-sm text-gray-500">frw</span>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
            >
              {loading ? (
                <Spinner classes="!h-5 !w-5 !text-red-500" />
              ) : (
                <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                {/* Decrease Button */}
                <button
                  onClick={handleDecrement}
                  disabled={formik.values.quantity <= 1 || localUpdateLoading}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-purple-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {localUpdateLoading ? (
                    <Spinner classes="!h-4 !w-4 !text-purple-600" />
                  ) : (
                    <Minus className="w-4 h-4 text-gray-600 group-hover:text-purple-600 transition-colors" />
                  )}
                </button>

                {/* Quantity Input */}
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    id="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-16 h-8 text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Increase Button */}
                <button
                  onClick={handleIncrement}
                  disabled={localLoading}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-purple-100 rounded-lg transition-colors group"
                >
                  {localLoading ? (
                    <Spinner classes="!h-4 !w-4 !text-purple-600" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-600 group-hover:text-purple-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-lg font-bold text-gray-900">
                {(price * formik.values.quantity).toLocaleString()} frw
              </div>
            </div>
          </div>

          {/* Error Message */}
          {formik.errors.quantity && (
            <div className="mt-2 text-sm text-red-500 bg-red-50 px-3 py-1 rounded-lg">
              {formik.errors.quantity}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;