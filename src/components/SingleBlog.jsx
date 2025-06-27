import { 
  ArrowLeft,
  Calendar,
  User,
  MessageCircle,
  Eye,
  Heart,
  Share2,
  Tag,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';


const SingleBlog = () => {
  // Mock blog data - replace with your actual data fetching logic
  const blog = {
    id: 1,
    title: "The Future of Digital Art in Modern Galleries",
    author: "Sarah Chen",
    date: "2023-05-15",
    category: "Digital Art",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    content: `
      <p class="mb-4">The art world is undergoing a digital renaissance, with galleries and museums increasingly embracing technology to showcase works in innovative ways. Digital art, once considered a niche, is now commanding attention in prestigious art spaces worldwide.</p>
      
      <h2 class="text-2xl font-bold my-6">The Rise of Digital Exhibitions</h2>
      
      <p class="mb-4">Traditional galleries are transforming their spaces to accommodate digital installations. The Museum of Modern Art in New York recently dedicated an entire wing to immersive digital experiences, featuring works by artists like Refik Anadol and teamLab.</p>
      
      <p class="mb-4">These installations often combine projection mapping, virtual reality, and interactive elements to create experiences that transcend traditional art viewing. Visitors don't just observe—they participate, becoming part of the artwork itself.</p>
      
      <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop" alt="Digital Art Installation" class="w-full rounded-xl my-6" />
      
      <h2 class="text-2xl font-bold my-6">NFTs and the Art Market</h2>
      
      <p class="mb-4">The emergence of NFTs (non-fungible tokens) has revolutionized how digital art is bought and sold. Christie's auction house made headlines when it sold Beeple's "Everydays: The First 5000 Days" for $69 million, signaling mainstream acceptance of digital art as a legitimate collectible.</p>
      
      <p class="mb-4">While the NFT market has seen fluctuations, the underlying technology continues to provide artists with new ways to monetize their work and prove authenticity in the digital realm.</p>
      
      <blockquote class="border-l-4 border-purple-500 pl-4 my-6 italic text-gray-700">
        "Digital art isn't replacing traditional art—it's expanding what art can be. The canvas is now limitless." — Marina Abramović
      </blockquote>
      
      <h2 class="text-2xl font-bold my-6">Challenges and Opportunities</h2>
      
      <p class="mb-4">Galleries face technical challenges in displaying digital works, from ensuring proper lighting to maintaining complex equipment. However, these challenges come with opportunities to reach global audiences through virtual exhibitions and augmented reality experiences.</p>
      
      <p class="mb-4">As technology continues to evolve, we can expect even more groundbreaking ways to experience and interact with digital art in gallery settings.</p>
    `,
    likes: 234,
    views: 1520,
    comments: [
      { id: 1, author: "Alex Johnson", date: "2023-05-16", content: "Great article! I've been following digital art trends and it's amazing to see how quickly the space is evolving." },
      { id: 2, author: "Maria Garcia", date: "2023-05-17", content: "The point about NFTs is spot on. The technology has so much potential beyond just the speculative market we've seen." }
    ],
    tags: ["Digital Art", "NFT", "Galleries", "Technology"]
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
            
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6">
              <span className="text-purple-300 text-sm font-medium">{blog.category}</span>
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {blog.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>By {blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }}></div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-600 text-sm rounded-full flex items-center gap-1"
                >
                  <Tag className="w-4 h-4" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats & Actions */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="w-5 h-5" />
                  <span>{blog.views} views</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Heart className="w-5 h-5" />
                  <span>{blog.likes} likes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageCircle className="w-5 h-5" />
                  <span>{blog.comments.length} comments</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleBlog;