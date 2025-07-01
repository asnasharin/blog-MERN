import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link } from "react-router-dom";
import { getBlogs } from "../../services/blogServices";

export default function LatestBlogs() {
    const dispatch = useAppDispatch()
  const blogs = useAppSelector((state) => state.blog.blogs);

  useEffect(() => {
      dispatch(getBlogs())
    },[dispatch])
  

  return (
    <section className="py-12 px-4 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Blogs</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs?.slice(0, 6).map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <img
                src={
                  blog.image.startsWith("http")
                    ? blog.image
                    : `${import.meta.env.VITE_SERVER_URL}/${blog.image.replace(/\\/g, "/")}`
                }
                alt={blog.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {blog.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
