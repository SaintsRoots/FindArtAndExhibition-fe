import { 
  MessageCircle, 
  Star, 
  Instagram, 
  Twitter, 
  Phone,
  Mail,
  CheckCircle,
  Calendar,
  User
} from 'lucide-react';

const ArtistCard = ({ id, name, imgSrc, email, status, role, createdAt }) => {
  // Format the join date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  // Generate a random rating for demo purposes (you can replace with actual data)
  const rating = (Math.random() * (5 - 4.5) + 4.5).toFixed(1);
  const followers = Math.floor(Math.random() * 2000) + 500;
  const artworks = Math.floor(Math.random() * 50) + 10;

  // Default profile image
  const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div key={id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Artist Image */}
      <div className="relative overflow-hidden">
        <img
          src={imgSrc || defaultImage}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>

        {/* Role Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-medium">
            {role}
          </div>
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Chat</span>
              </button>
              <button className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Info */}
      <div className="p-6">
        {/* Name and Rating */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{rating}</span>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Mail className="w-4 h-4" />
          <span className="text-sm truncate">{email}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="text-center">
            <div className="font-semibold text-gray-900">{artworks}</div>
            <div>Artworks</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{followers}</div>
            <div>Followers</div>
          </div>
          <div className="text-center flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <div className="text-xs">{formatDate(createdAt)}</div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 pt-4 border-t border-gray-100">
          <button className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors group">
            <Twitter className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          <button className="w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-full flex items-center justify-center transition-colors group">
            <Instagram className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
          </button>
          <button className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors group">
            <Phone className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;