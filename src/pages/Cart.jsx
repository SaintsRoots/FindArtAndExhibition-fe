import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  ShoppingCart,
  CreditCard,
  MapPin,
  User,
  Mail,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import CartCard from "../components/CartCard";
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
import FlutterwavePayment from "../components/flutterWave/FlutterwavePayment";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectAllcart);
  const totalPrice = useSelector(selectTotalPrice);
  const totalItems = useSelector(selectTotalItems);
  const cartId = useSelector(selectCartId);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProceedingToPayment, setIsProceedingToPayment] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

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
        const data = await dispatch(
          makeOrders({
            cartId: cartId,
            shippingAddress: values.shippingAddress,
          })
        ).unwrap();

        console.log("Order created successfully: ", data);

        // Show success notification
        notifySuccess(
          `Successfully ordered ${totalItems} items. Redirecting to payment...`
        );

        // Set order completed flag
        // setOrderCompleted(true);
        setLoading(false);

        // Wait 3 seconds before proceeding to payment
        // setIsProceedingToPayment(true);
        // await new Promise(resolve => setTimeout(resolve, 3000));

        // After delay, trigger Flutterwave payment
        // This will be handled by the FlutterwavePayment component
        // setIsProceedingToPayment(false);

        // Refresh cart

        formik.resetForm();

        // navigate(data.paymentUrl);

        window.location.href = data.paymentUrl;
        dispatch(getCart());
        formik.resetForm();
      } catch (error) {
        setLoading(false);
        setOrderCompleted(false);
        notifyError(error.message);
      }
    },
  });

  // Function to handle payment initiation
  const handlePaymentClick = async (e) => {
    if (!orderCompleted) {
      e.preventDefault();

      // Validate form first
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        formik.setTouched({
          shippingAddress: true,
        });
        // notifyError("Please fill in all required fields");
        return;
      }

      // Submit form to create order
      await formik.handleSubmit();
    }
    // If order is completed, allow Flutterwave to proceed
  };

  const EmptyCartSection = () => (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingCart className="w-16 h-16 text-purple-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-8">
          Discover amazing artworks and add them to your cart to get started.
        </p>
        <a
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
        >
          <ShoppingBag className="w-5 h-5" />
          Browse Artworks
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );

  const HeroSection = () => (
    <section className="relative py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
            <ShoppingCart className="w-4 h-4 text-purple-300 mr-2" />
            <span className="text-purple-300 text-sm font-medium">
              {totalItems} Items in Cart
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
            Your Shopping
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Cart
            </span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Review your selected artworks and complete your purchase securely.
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {isModalOpen && (
        <Modal close={() => setIsModalOpen(false)} email={email} />
      )}

      <HeroSection />

      <div className="container mx-auto px-6 py-12">
        {cart && cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Order Summary
                    </h2>
                    <p className="text-gray-600">
                      Review your items and adjust quantities as needed
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">
                      {totalItems}
                    </div>
                    <div className="text-sm text-gray-500">Items</div>
                  </div>
                </div>

                <div className="space-y-4">
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
              </div>
            </div>

            {/* Payment Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment Details
                    </h2>
                    <p className="text-sm text-gray-600">
                      Complete your purchase
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={name || ""}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email || ""}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                        placeholder="Email Address"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        id="shippingAddress"
                        placeholder="Enter your shipping address..."
                        value={formik.values.shippingAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows="3"
                      />
                    </div>

                    {formik.touched.shippingAddress &&
                      formik.errors.shippingAddress && (
                        <div className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                          {formik.errors.shippingAddress}
                        </div>
                      )}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Items ({totalItems})
                      </span>
                      <span className="font-semibold">
                        {totalPrice?.toLocaleString()} frw
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-purple-600">
                          {totalPrice?.toLocaleString()} frw
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <div className="pt-4">
                    {loading || isProceedingToPayment ? (
                      <div className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl flex items-center justify-center gap-2">
                        <Spinner classes="!h-6 !w-6 !text-white" />
                        <span>
                          {isProceedingToPayment
                            ? "Redirecting to payment..."
                            : "Processing..."}
                        </span>
                      </div>
                    ) : (
                      <div
                        className="w-full text-white bg-black rounded-md relative"
                        onClick={handlePaymentClick}
                      >
                        <FlutterwavePayment
                          amount={totalPrice}
                          email={email}
                          phone={phone}
                          name={name}
                          disabled={!orderCompleted}
                          className="w-full absolute z-10 left-0 top-0 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    )}
                  </div>

                  {/* Security Features */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Free Shipping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyCartSection />
        )}
      </div>
    </div>
  );
};

export default Cart;
