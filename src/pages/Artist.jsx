import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { 
  Users, 
  Star, 
  CheckCircle,
  Search,
  Filter
} from 'lucide-react';
import ArtistCard from "../components/ArtistCard";
import {
  selectAllartist,
  getAllartist,
  selectartistloading,
  selectartistError,
} from "../features/artist/artistSlice";
import NoData from "../components/NoData";
import Skeleton from "../components/skeleton/artists.skeleton";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const artist = useSelector(selectAllartist);
  const artistloading = useSelector(selectartistloading);
  const artistError = useSelector(selectartistError);
  
  // Filter only approved artists
  const approvedArtists = artist.filter((artist) => artist.status === "approved" && artist.role === "Artist");

  useEffect(() => {
    dispatch(getAllartist());
  }, [dispatch]);

  const HeroSection = () => (
    <section className="relative py-20 bg-gradient-to-br  from-slate-900 via-purple-900 to-slate-900 overflow-hidden w-full">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mt-10 mx-auto px-6">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
            <Users className="w-4 h-4 text-purple-300 mr-2" />
            <span className="text-purple-300 text-sm font-medium">
              {approvedArtists.length} Verified Artists
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Meet Our
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Creative Artists
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Connect directly with talented artists from around the world. Each artist is verified and ready to bring your creative visions to life.
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 z-30 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search artists..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  let content;
  if (artistError) {
    content = (
      <div className="col-span-full flex justify-center items-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <p className="text-lg text-red-600">Error loading artists: {artistError}</p>
          <button 
            onClick={() => dispatch(getAllartist())}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  } else if (artistloading) {
    content = Array.from({ length: 8 }, (_, index) => <Skeleton key={index} />);
  } else if (approvedArtists.length === 0) {
    content = (
      <div className="col-span-full flex justify-center items-center py-20">
        <NoData />
      </div>
    );
  } else {
    content = approvedArtists.map((artist) => (
      <ArtistCard
        key={artist._id}
        id={artist._id}
        name={artist.name}
        email={artist.email}
        imgSrc={artist.img}
        status={artist.status}
        role={artist.role}
        createdAt={artist.createdAt}
      />
    ));
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-purple-50">
      <HeroSection />
      
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{approvedArtists.length}+</div>
              <div className="text-gray-600">Verified Artists</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600">Approval Rate</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>

          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {content}
          </div>

          {/* Load More Button */}
          {approvedArtists.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
                Load More Artists
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArtistPage;