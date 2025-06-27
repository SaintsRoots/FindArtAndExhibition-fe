import { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  List, 
  SlidersHorizontal,
  ArrowRight,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import blogs from "../components/JsonData/blogsData";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Auto-slide for featured blogs
  const featuredBlogs = blogs.slice(0, 3);
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredBlogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredBlogs.length]);


  const categories = [
    { id: 'all', name: 'All Posts', count: blogs.length },
    { id: 'design', name: 'Design', count: blogs.filter(b => b.category === 'design').length },
    { id: 'development', name: 'Development', count: blogs.filter(b => b.category === 'development').length },
    { id: 'business', name: 'Business', count: blogs.filter(b => b.category === 'business').length },
    { id: 'lifestyle', name: 'Lifestyle', count: blogs.filter(b => b.category === 'lifestyle').length },
  ];

  const BlogCard = ({
    title,
    description,
    date,
    author,
    comments,
    image,
    category,
    likes,
    views
  }) => {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{likes || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{comments.length}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>By {author}</span>
            <span>•</span>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            <Link to={`/blog/${title}`}>{title}</Link>
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{views || 0} views</span>
            <Link 
              to={`/blog/${title}`}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <span className="font-medium">Read More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const HeroSection = () => (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mt-10">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6">
            <span className="text-purple-300 text-sm font-medium"> Latest Articles</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Blog</span>
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Discover insightful articles, tutorials, and industry news from our team of experts.
            Stay updated with the latest trends and best practices.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 z-10 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </section>
  );

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
                placeholder="Search blog posts..."
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
              <Grid className="w-5 h-5" />
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
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-100 text-purple-600 border-2 border-purple-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs bg-white/50 px-2 py-1 rounded-full">{category.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  const FeaturedPostCarousel = () => (
    <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Posts</h2>
          <p className="text-gray-600">Discover our most popular articles</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="relative h-96">
            {featuredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === featuredIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Blog Info */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 text-xs bg-purple-500 rounded-full">{blog.category}</span>
                    <span className="text-sm text-gray-300">{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{blog.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm">By {blog.author}</span>
                    </div>
                    <Link 
                      to={`/blog/${blog.title}`}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            onClick={() => setFeaturedIndex((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-purple-600 hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setFeaturedIndex((prev) => (prev + 1) % featuredBlogs.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-purple-600 hover:bg-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredBlogs.map((_, index) => (
              <button
                key={index}
                onClick={() => setFeaturedIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === featuredIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const BlogPostsSection = () => (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
              <p className="text-gray-600">Discover our newest content</p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} {...blog} />
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {blogs.map((blog) => (
                  <div key={blog.id} className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                    <div className="md:w-1/3">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                          {blog.category}
                        </span>
                        <span>•</span>
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        <Link to={`/blog/${blog.title}`}>{blog.title}</Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{blog.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>By {blog.author}</span>
                          <span>•</span>
                          <span>{blog.comments.length} comments</span>
                        </div>
                        <Link 
                          to={`/blog/${blog.title}`}
                          className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <span className="font-medium">Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-lg">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                  3
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                          activeCategory === category.id ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {blogs.slice(0, 3).map((blog) => (
                    <div key={blog.id} className="flex gap-3">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 line-clamp-2">
                          <Link to={`/blog/${blog.title}`}>{blog.title}</Link>
                        </h4>
                        <p className="text-xs text-gray-500">{new Date(blog.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['Design', 'Development', 'Marketing', 'Business', 'Lifestyle', 'Tips', 'Tutorial'].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const NewsletterSection = () => (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-purple-100 mb-8">
            Get the latest articles, news, and resources delivered straight to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategoryFilter />
      <FeaturedPostCarousel />
      <BlogPostsSection />
      <NewsletterSection />
    </div>
  );
};

export default Blog;