import { useState } from "react";
import { Heart, Eye, Star } from "lucide-react";
import { MdEdit, MdDelete } from "react-icons/md";
import Modal from "./EditArtsModal";
import Spinner from "../../components/Spinner";
import { notifyError, notifySuccess } from "../notifications/notification";

const Cards = ({
  id,
  name,
  description,
  image,
  deleteArt,
  price,
  available_arts,
  category,
  likes,
  views,
  rating,
  isLimited,
  isNew,
  isTrending,
}) => {
  const [model, setModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes || 0);

  // Handle modal
  const handleModal = () => {
    setModal(!model);
  };

  // Handle delete
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteArt(id);
      notifySuccess("Artwork deleted successfully");
    } catch (error) {
      notifyError("Failed to delete artwork");
      console.error("Error deleting art:", error);
    } finally {
      setDeleting(false);
    }
  };

  // Handle like
  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  // Get badge type
  const getBadgeInfo = () => {
    if (isLimited) return { text: "Limited Edition", color: "bg-red-500" };
    if (isNew) return { text: "New Arrival", color: "bg-green-500" };
    if (isTrending) return { text: "Trending", color: "bg-purple-500" };
    return null;
  };

  const badgeInfo = getBadgeInfo();

  return (
    <>
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-[20rem] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        
        {/* Badge */}
        {badgeInfo && (
          <div className={`absolute top-4 left-4 px-3 py-1 ${badgeInfo.color} text-white text-xs font-semibold rounded-full`}>
            {badgeInfo.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isLiked ? "bg-red-500/20 text-red-500" : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Admin Actions */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={handleModal}
            className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
          >
            <MdEdit className="text-lg" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-red-500/30 transition-colors"
            disabled={deleting}
          >
            {deleting ? (
              <Spinner classes="text-white h-4 w-4 animate-spin" />
            ) : (
              <MdDelete className="text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-sm text-purple-600 font-medium">{category}</span>
            <h3 className="text-xl font-bold text-gray-900 mt-1">{name}</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{price} RWF</div>
            {available_arts && (
              <div className="text-sm text-gray-500">{available_arts} available</div>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className={`w-4 h-4 ${isLiked ? "text-red-500 fill-current" : ""}`} />
              <span>{currentLikes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{views || 0}</span>
            </div>
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>

    
    </div>
  {/* Modal */}
      {model && (
        <Modal
          close={handleModal}
          id={id}
          name={name}
          description={description}
          image={image}
          category={category}
          available_arts={available_arts}
          price={price}
        />
      )}
    </>
  );
};

export default Cards;