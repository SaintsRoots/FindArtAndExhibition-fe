import { 
  Facebook, 
  Instagram, 
  Twitter, 
  MessageCircle,
  Phone,
  MapPin,
  Truck,
  RefreshCw,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from "react-router-dom";
import { getCurrentYear } from "../utils/CurrentYear";
import { LuMail } from 'react-icons/lu';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-purple-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Art Gallery
            </h3>
            <p className="text-gray-300">
              Discover unique artworks from talented artists around the world. 
              Our platform connects art lovers with creators in a seamless digital experience.
            </p>
            <div className="flex items-center gap-4">
              <Link to="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link to="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link to="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to="/shop" className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                  Photography
                </Link>
              </li>
              <li>
                <Link to="/shop" className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                  Painting
                </Link>
              </li>
              <li>
                <Link to="/shop" className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                  Sculpture
                </Link>
              </li>
              <li>
                <Link to="/shop" className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                  Ceramic
                </Link>
              </li>
              <li>
                <Link to="/shop" className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                  Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Help & Information</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Info
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Returns & Exchanges
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                FAQs
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                (+250) 780 636 729
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Kayonza-Mukarange, Nyagatovu
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter for the latest artworks, artists, and exclusive offers.
            </p>
            <form className="flex flex-col gap-4">
              <div className="relative">
                <LuMail className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>
            Copyright © {getCurrentYear()} All rights reserved | Made by{" "}
            <span className="text-purple-300 font-medium">Uwiringiye Elyse</span> & 
            distributed by <span className="text-purple-300 font-medium">University of lay adventists of kigali</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;