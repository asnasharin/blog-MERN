import { useAppDispatch, useAppSelector } from "../../redux/store";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useEffect } from "react";
import { getBlogs } from "../../services/blogServices";

export default function BlogList() {
    const dispatch = useAppDispatch()
  const blogs = useAppSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(getBlogs())
  },[dispatch])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">All Blogs</h1>

        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                content={blog.content}
                image={blog.image}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
