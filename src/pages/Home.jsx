import { useState, useEffect } from "react";
import {
  Heart,
  TrendingUp,
  Users,
  Palette,
  Award,
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import OverviewSection from "../components/OverviewSection";
import ArtistPage from "./AtistPage";

const Home = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featuredArtworks = [
    {
      id: 1,
      title: "Ethereal Dreams",
      artist: "Sarah Chen",
      price: 2400,
      originalPrice: 2800,
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
      category: "Abstract Painting",
      likes: 234,
      views: 1520,
      rating: 4.8,
      isLimited: true,
      badge: "Editor's Choice",
    },
    {
      id: 2,
      title: "Urban Symphony",
      artist: "Marcus Rodriguez",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "Street Art",
      likes: 189,
      views: 980,
      rating: 4.9,
      isNew: true,
      badge: "New Arrival",
    },
    {
      id: 3,
      title: "Serenity Waves",
      artist: "Emma Thompson",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=600&fit=crop",
      category: "Landscape",
      likes: 312,
      views: 2100,
      rating: 4.7,
      isTrending: true,
      badge: "Trending",
    },
  ];

  const stats = [
    { label: "Active Artists", value: "2,500+", icon: Users },
    { label: "Artworks Sold", value: "15,000+", icon: TrendingUp },
    { label: "Happy Customers", value: "8,000+", icon: Award },
    { label: "Countries Served", value: "50+", icon: Palette },
  ];

  // Auto-slide for featured artworks
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredArtworks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredArtworks.length]);

  const HeroSection = () => (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
                <span className="text-purple-300 text-sm font-medium">
                  Discover Amazing Art
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Where Art Meets
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Digital Magic
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Connect directly with talented artists, discover unique
                masterpieces, and build your dream collection. From emerging
                talents to established masters - all in one platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <span>Explore Artworks</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Featured Artwork Carousel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="relative h-96 lg:h-[500px]">
                {featuredArtworks.map((artwork, index) => (
                  <div
                    key={artwork.id}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === featuredIndex
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-full"
                    }`}
                  >
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Artwork Info */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 text-xs bg-purple-500 rounded-full">
                          {artwork.badge}
                        </span>
                        <span className="text-sm text-gray-300">
                          {artwork.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">
                        {artwork.title}
                      </h3>
                      <p className="text-gray-300 mb-3">by {artwork.artist}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold">
                            {artwork.price} RWF
                          </span>
                          {artwork.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                              {artwork.originalPrice} RWF
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5" />
                          <span>{artwork.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button
                onClick={() =>
                  setFeaturedIndex(
                    (prev) =>
                      (prev - 1 + featuredArtworks.length) %
                      featuredArtworks.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() =>
                  setFeaturedIndex(
                    (prev) => (prev + 1) % featuredArtworks.length
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredArtworks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setFeaturedIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === featuredIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const FeaturedArtists = () => (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Artists
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect directly with talented artists and discover their unique
            stories
          </p>
        </div>
        <ArtistPage />

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
            Discover More Artists
          </button>
        </div>
      </div>
    </section>
  );

  const CallToAction = () => (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Art Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of art lovers and collectors who trust our platform
            to discover, connect, and acquire amazing artworks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Start Collecting
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Become an Artist
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-purple-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Global Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <OverviewSection />
      <FeaturedArtists />
      <CallToAction />
    </div>
  );
};

export default Home;
