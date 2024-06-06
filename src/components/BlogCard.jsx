import Button from "../components/form/Button";
import { FaLongArrowAltRight } from "react-icons/fa";
import formatDate from "../utils/FormateDate";
const BlogCard = ({
  title,
  description,
  date,
  author,
  ncomment,
  comments,
  image,
}) => {
  return (
    <div className="flex flex-col pt-3 pb-3 gap-4 relative group">
      <div className="max-h-[400px] overflow-hidden">
        <img src={image} alt={title} className="aspect-square  duration-100 " />
      </div>
      <div className="flex flex-col leading-6">
        <h1 className="text-lg font-bold capitalize">{title}</h1>
        <p className="text-sm font-normal ">{description}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 ">
          <span>By {author}</span> |
          <span>
            {ncomment} {comments} comments
          </span>
        </div>
        <Button
          icon={<FaLongArrowAltRight />}
          styles={`!border-0 hover:bg-white !text-primary`}
          title={`Continue Reading `}
          path={`/blog/${title}`}
        />
      </div>
      <div className="flex p-4 hover:bg-primary hover:text-secondary cursor-pointer duration-200 hover:scale-105 bg-secondary text-textColor justify-between absolute left-4 top-7 items-start">
        <h1 className="text-base font-semibold">{formatDate(date)}</h1>
      </div>
    </div>
  );
};

export default BlogCard;
