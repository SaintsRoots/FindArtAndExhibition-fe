import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  Target, 
  Globe, 
  Award, 
  Palette, 
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Quote
} from 'lucide-react';
import mission from "../assets/paints.jpg";
import Story from "../assets/bg-5.jpg";

const About = () => {
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Artists Supported", value: "2,500+", icon: Users, color: "from-purple-500 to-pink-500" },
    { label: "Artworks Sold", value: "15,000+", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
    { label: "Countries Reached", value: "50+", icon: Globe, color: "from-green-500 to-emerald-500" },
    { label: "Happy Customers", value: "8,000+", icon: Award, color: "from-orange-500 to-red-500" }
  ];

  const missionPoints = [
    {
      id: 1,
      title: "Empower Artists",
      description: "We strive to provide a platform where artists from around the world can showcase their work and reach a global audience. By offering a space for their creations, we aim to support their passion and help them achieve financial independence.",
      icon: Palette,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Foster Creativity", 
      description: "Online Art Finder and exhibition, we celebrate creativity in all its forms. Our mission is to inspire and nurture artistic expression by curating a diverse collection of art pieces that cater to various tastes and styles.",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      id: 3,
      title: "Enhance Accessibility",
      description: "We believe that art should be accessible to everyone. Our platform offers a wide range of art pieces at different price points, making it easy for art lovers to find something that fits their budget and style.",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      title: "Create Community",
      description: "Online Art Finder and exhibition is more than just an eCommerce platform; it's a community of art lovers. We aim to create a space where artists and buyers can connect, share stories, and celebrate the joy of art together.",
      icon: Globe,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const values = [
    "Authentic artistic expression",
    "Fair compensation for artists", 
    "Exceptional customer service",
    "Global accessibility",
    "Creative community building"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div 
              className="space-y-8"
              data-animate
              id="hero"
            >
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6">
                <span className="text-purple-300 text-sm font-medium"> Our Story</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                About
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}ArtFinder
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Our mission is to connect talented artists with art enthusiasts who appreciate the beauty and craftsmanship of unique creations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <span>Explore Our Artists</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group"
                data-animate
                id={`stat-${index}`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div 
              className={`space-y-8 transition-all duration-1000 ${
                isVisible['story'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              data-animate
              id="story"
            >
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                  <Star className="w-4 h-4 mr-2" />
                  Our Journey
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Our story started with a deep admiration for the artists who pour their heart and soul into their creations. We noticed that many talented artists struggled to find a platform that truly showcased their work and reached a wider audience.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  This observation sparked the idea of Online Art Finder and exhibition, an online marketplace dedicated to connecting these artists with people who appreciate the uniqueness and beauty of handmade art.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500">
                <Quote className="w-8 h-8 text-purple-500 mb-4" />
                <p className="text-lg text-gray-700 italic leading-relaxed mb-4">
                  "As we continue to grow, our commitment to these principles remains steadfast. We are dedicated to supporting our artists, inspiring creativity, and bringing beautiful, meaningful art into homes around the world."
                </p>
                <p className="text-gray-600">
                  Thank you for being a part of our story. Together, we can make a difference in the art world and beyond.
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600">Questions? Call us at</p>
                  <p className="text-lg font-semibold text-purple-600">(+250) 784 404 173</p>
                </div>
              </div>
            </div>

            <div 
              className={`relative transition-all duration-1000 delay-200 ${
                isVisible['story'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative">
                  <img
                    src={Story}
                    className="w-full aspect-square object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                    alt="Our Story"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80 blur-sm animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 blur-sm animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div 
              className={`relative order-2 lg:order-1 transition-all duration-1000 ${
                isVisible['mission'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative">
                  <img
                    src={mission}
                    className="w-full aspect-square object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                    alt="Our Mission"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-70 blur-sm animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-60 blur-sm animate-pulse delay-1500"></div>
            </div>

            <div 
              className={`space-y-8 order-1 lg:order-2 transition-all duration-1000 delay-200 ${
                isVisible['mission'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              data-animate
              id="mission"
            >
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                  <Target className="w-4 h-4 mr-2" />
                  Our Purpose
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We're on a mission to revolutionize how art is discovered, shared, and collected worldwide.
                </p>
              </div>

              <div className="space-y-6">
                {missionPoints.map((point, index) => (
                  <div 
                    key={point.id}
                    className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${point.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <point.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {point.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div 
            className={`transition-all duration-1000 ${
              isVisible['values'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            data-animate
            id="values"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4 mr-2" />
              Our Values
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What We Stand For
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to the art community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-800 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Whether you're an artist looking to showcase your work or an art lover seeking unique pieces, we'd love to have you join our growing community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                Browse Artworks
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors transform hover:scale-105">
                Become an Artist
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-purple-100">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>(+250) 784 404 173</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>hello@artfinder.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Kigali, Rwanda</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;