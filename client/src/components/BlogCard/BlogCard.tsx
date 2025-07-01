import { useEffect, type FC } from "react";

interface BlogCardProps {
  _id?: string;
  title: string;
  content: string;
  image: string;
  createdAt?: string;
}

const BlogCard: FC<BlogCardProps> = ({ title, content, image, createdAt }) => {

  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {createdAt && (
          <span className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
      <p className="text-gray-600 mt-2 line-clamp-3">{content}</p>
    </div>
  );
};

export default BlogCard;
