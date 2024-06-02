import BlogCard from "../components/BlogCard";
import FeaturedProducts from "../components/FeaturedProducts";
import Button from "../components/form/Button";
import blogs from "../components/JsonData/blogsData";
import { filterBar } from "../components/JsonData/filterBar";
import { Link } from "react-router-dom";
const Blog = () => {
  return (
    <div className="container mx-auto px-6 md:px-14 min-h-screen pt-14 pb-14 mt-14  flex flex-col gap-12 justify-center">
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-4xl font-bold">Our Latest News </h1>
          <p className="w-full md:w-2/3 text-center text-lg mx-auto">Blogs</p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-4  gap-6">
          <div className="md:col-span-3">
            {blogs.slice(0, 3).map((item, index) => (
              <div key={index}>
                <BlogCard
                  title={item?.title}
                  image={item?.image}
                  date={item?.date}
                  description={item?.description}
                  comments={item?.comments}
                  author={item?.author}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col pt-3 pb-3 gap-3 col-span-1 ">
            <div className="flex flex-col items-start gap-6">
              <h1 className="text-lg font-bold">Categories</h1>
              <ul className="flex flex-col gap-1 w-full ">
                {filterBar.slice(1).map((item, index) => (
                  <li
                    key={index}
                    className=" border-0 border-b-2 p-1 flex hover:text-primary border-slate-400 w-full "
                  >
                    <Link to="shop" className="w-full">
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <FeaturedProducts />
          </div>
        </div>
      </div>
      <div className="flex gap-1 items-center ">
        <Button title={`1`} styles={`!rounded-full bg-primary text-white`} />
        <Button title={`2`} styles={`!rounded-full`} />
      </div>
    </div>
  );
};

export default Blog;
