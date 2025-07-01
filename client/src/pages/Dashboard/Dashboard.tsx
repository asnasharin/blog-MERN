import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export default function Dashboard() {
  const blogs = useAppSelector((state) => state.blog.blogs)
 

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Blog
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="space-y-6">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full md:w-48 h-32 object-cover rounded-md"
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {blog.title}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {/* {new Date(blog.createdAt).toLocalseDateString()} */}
                    </span>
                  </div>
                  <p className="text-gray-600">{blog.content}</p>
                  <div className="mt-4 flex gap-4">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
