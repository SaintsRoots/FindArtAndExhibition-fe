import { useState, useEffect } from "react";
import { 
  Search,
  SlidersHorizontal,
  Grid2x2,
  List,
} from "lucide-react";
import ArtsCard from "./ArtsCard";
import Skeleton from "../components/skeleton/arts.skeleton";
import NoData from "./NoData";
import { useSelector, useDispatch } from "react-redux";
import { getAllArts, selectAllarts, selectArtsloading, selectArtsError } from "../features/arts/artsSlice";
import Button from "./form/Button";

const OverviewSection = () => {
  const dispatch = useDispatch();
  const allArts = useSelector(selectAllarts);
  const artsLoading = useSelector(selectArtsloading);
  const artsError = useSelector(selectArtsError);
  
  // State for filtering
  const [activeCategory, setActiveCategory] = useState("All Arts");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(true); 
  const [priceRange, setPriceRange] = useState("all");
  const [medium, setMedium] = useState("all");
  const [size, setSize] = useState("all");
  const [availability, setAvailability] = useState("all");

  // Generate categories from actual data
  const categories = [
    { name: 'All Arts', count: allArts.length },
    ...Array.from(new Set(allArts.map(art => art.category))).map(category => ({
      name: category,
      count: allArts.filter(art => art.category === category).length
    }))
  ];

  // Filter arts based on selected criteria
  const filteredArts = allArts.filter(art => {
    // Category filter - now using category name directly
    const matchesCategory = activeCategory === "All Arts" || art.category === activeCategory;
    
    // Search filter
    const matchesSearch = searchTerm === "" || 
                         art.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         art.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price filter
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "low" && art.price < 10000) ||
                        (priceRange === "medium" && art.price >= 10000 && art.price < 50000) ||
                        (priceRange === "high" && art.price >= 50000);
    
    // Medium filter
    const matchesMedium = medium === "all" || 
                         art.medium?.toLowerCase() === medium;
    
    // Availability filter
    const matchesAvailability = availability === "all" ||
                              (availability === "in-stock" && art.available_arts > 0) ||
                              (availability === "limited" && art.isLimitedEdition) ||
                              (availability === "custom" && art.isCustomOrder);

    return matchesCategory && matchesSearch && matchesPrice && matchesMedium && matchesAvailability;
  });

  useEffect(() => {
    dispatch(getAllArts());
  }, [dispatch]);

  const renderContent = () => {
    if (artsError) {
      return <p className="text-base text-red-700">Error: {artsError}</p>;
    }
    
    if (artsLoading) {
      return Array.from({ length: 8 }, (_, index) => <Skeleton key={index} />);
    }
    
    if (filteredArts.length === 0) {
      return (
        <div className="min-h-[50vh] flex flex-col gap-4 justify-center">
          <NoData message="No artworks match your filters" />
        </div>
      );
    }
    
    return filteredArts.map((item) => (
      <ArtsCard
        key={item._id}
        available={item.available_arts}
        image={item.image}
        name={item.name}
        price={item.price}
        id={item._id}
        money="Frw"
        category={item.category}
        description={item.description}
      />
    ));
  };

  const CategoryFilter = () => (
    <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search & Filter */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search artworks, artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <Grid2x2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.name
                  ? 'bg-purple-100 text-purple-600 border-2 border-purple-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs bg-white/50 px-2 py-1 rounded-full">{category.count}</span>
            </button>
          ))}
        </div>

        {/* Advanced Filters Panel - Now shown by default */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">Any Price</option>
                  <option value="low">Under 10,000 Frw</option>
                  <option value="medium">10,000 - 50,000 Frw</option>
                  <option value="high">Over 50,000 Frw</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
                <select 
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Mediums</option>
                  <option value="painting">Painting</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="photography">Photography</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select 
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">Any Size</option>
                  <option value="small">Small (under 12")</option>
                  <option value="medium">Medium (12" - 24")</option>
                  <option value="large">Large (24" - 36")</option>
                  <option value="xlarge">Extra Large (36"+)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select 
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Items</option>
                  <option value="in-stock">In Stock</option>
                  <option value="limited">Limited Edition</option>
                  <option value="custom">Custom Order</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => {
                  setPriceRange("all");
                  setMedium("all");
                  setSize("all");
                  setAvailability("all");
                  setShowFilters(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear Filters
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 min-h-screen py-8">
      {/* Hero Section for Shop */}
      <div className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Unique <span className="text-purple-600">Artworks</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Explore our curated collection of handcrafted artworks from talented artists worldwide.
        </p>
      </div>

      {/* Filter Component */}
      <CategoryFilter />

      {/* Artworks Grid */}
      <div className={`mt-8 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}`}>
        {renderContent()}
      </div>

      {/* Load More Button */}
      {filteredArts.length > 0 && (
        <div className="mt-12 text-center">
          <Button
            title="Load More Artworks"
            styles="!mx-auto !rounded-full !px-8 !py-3 !text-lg"
            path="/shop"
          />
        </div>
      )}
    </div>
  );
};

export default OverviewSection;