import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCartPlus, FaStar, FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Button from "./form/Button";
import ArtsCard from "./ArtsCard";
import Skeleton from "../components/skeleton/arts.skeleton";
import Skeletn from "./skeleton/single.skeleton";
import NoData from "./NoData";
import Spinner from "./Spinner";
import { notifySuccess, notifyError } from "../components/notifications/notification";
import {
  getAllArts,
  selectAllarts,
  selectArtsloading,
  selectArtsError,
  getArtsByName,
  selectCurrentArt,
} from "../features/arts/artsSlice";
import { addItemToCart } from "../features/cart/cartSlice";

const SingleArts = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const [localLoading, setLocalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const single = useSelector(selectCurrentArt);
  const arts = useSelector(selectAllarts);
  const artsLoading = useSelector(selectArtsloading);
  const artsError = useSelector(selectArtsError);

  const handleAddItemToCart = async (productId) => {
    setLocalLoading(true);
    try {
      const resultAction = await dispatch(addItemToCart({ productId, quantity: 1 }));
      handleResultAction(resultAction);
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleResultAction = (resultAction) => {
    if (addItemToCart.fulfilled.match(resultAction)) {
      notifySuccess("Item added to cart successfully!");
    } else {
      notifyError("Please login first");
    }
  };

  useEffect(() => {
    dispatch(getAllArts());
    if (name) {
      dispatch(getArtsByName(name));
    }
  }, [name, dispatch]);

  const renderMainContent = () => {
    if (artsError) {
      return <p className="text-base text-red-700">Error: {artsError}</p>;
    }

    if (artsLoading) {
      return <Skeletn />;
    }

    if (arts.length === 0) {
      return (
        <div className="min-h-screen flex flex-col gap-4 justify-center">
          <NoData />
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>Arts</span>
          <FaChevronRight className="mx-2 text-xs" />
          <span>{single?.category}</span>
          <FaChevronRight className="mx-2 text-xs" />
          <span className="text-gray-700">{single?.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img
              src={single?.image}
              alt={single?.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4">
            {/* Artist Info */}
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={single?.owner?.img}
                    alt={single?.owner?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{single?.owner?.name}</p>
                  <p className="text-xs text-gray-500">{single?.owner?.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Contact</p>
                <p className="text-xs text-gray-500">
                  +25{single?.owner?.phone || "0 729 800 742"}
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">{single?.name}</h1>
              
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {single?.reviews || 50} reviews
                </span>
              </div>

              <div className="py-2">
                {single?.available_arts > 0 ? (
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    In Stock: {single?.available_arts} available
                  </span>
                ) : (
                  <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                    Sold Out
                  </span>
                )}
              </div>

              <p className="text-gray-700">{single?.description}</p>

              <p className="text-2xl font-bold text-primary">
                {single?.price?.toLocaleString()} Frw
              </p>
            </div>

            {/* Add to Cart Button */}
            <Button
              click={() => handleAddItemToCart(single?._id)}
              title={localLoading ? <Spinner classes="!h-5 !w-5" /> : "Add to Cart"}
              icon={!localLoading && <FaCartPlus />}
              styles="w-full md:w-auto"
              disabled={single?.available_arts <= 0}
            />
          </div>
        </div>
      </>
    );
  };

  const renderRelatedProducts = () => {
    if (artsError) {
      return <p className="text-base text-red-700">Error: {artsError}</p>;
    }

    if (artsLoading) {
      return Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} />
      ));
    }

    if (arts.length === 0) {
      return <NoData />;
    }

    return arts.slice(0, 4).map((item) => (
      <ArtsCard
        key={item._id}
        available={item.available_arts}
        image={item.image}
        name={item.name}
        price={item.price}
        money="Frw"
        id={item._id}
        category={item.category}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Product Details</h3>
            <p>{single?.description}</p>
            {/* Add more details as needed */}
          </div>
        );
      case "reviews":
        return (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Customer Reviews</h3>
            <p>No reviews yet. Be the first to review!</p>
          </div>
        );
      case "discussion":
        return (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Discussion</h3>
            <p>Start a conversation about this product</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 min-h-screen">
      {renderMainContent()}

      {/* Tabs Navigation */}
      <div className="mt-12 border-b">
        <div className="flex gap-6">
          {["details", "reviews", "discussion"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 font-medium capitalize ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderRelatedProducts()}
        </div>
      </div>
    </div>
  );
};

export default SingleArts;