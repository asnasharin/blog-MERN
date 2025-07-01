import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { useState } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { deleteBlog } from "../../services/blogServices"; 
import EditBlogModal from "../../components/EditBlogModal/EditBlogModal";
import { editBlog } from "../../services/blogServices";
import type { Iblog } from "../../types/blogTypes";

export default function Dashboard() {
  const blogs = useAppSelector((state) => state.blog.blogs);
  const dispatch = useAppDispatch();

  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Iblog | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  
  const handleDelete = () => {
    if (selectedBlogId) {
      dispatch(deleteBlog(selectedBlogId));
      setSelectedBlogId(null);
      window.location.reload()
    }
  };

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
                      {/* {new Date(blog.createdAt).toLocaleDateString()} */}
                    </span>
                  </div>
                  <p className="text-gray-600">{blog.content}</p>
                  <div className="mt-4 flex gap-4">
                    <button
                     onClick={() => {
                     setEditingBlog(blog);
                     setShowEditModal(true);
                    }}
                     className="text-blue-600 hover:underline"
                    >
                    Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBlogId(blog._id);
                        setShowModal(true);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Modal */}
        <DeleteModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          title="Delete Blog"
          message="Are you sure you want to permanently delete this blog?"
        />

        <EditBlogModal
  show={showEditModal}
  onClose={() => setShowEditModal(false)}
  blog={editingBlog}
  onSave={(formData) => {
    if (editingBlog) {
      dispatch(editBlog({ id: editingBlog._id, formData }));
      setShowEditModal(false);
    }
  }}
/>


      </div>
    </div>
  );
}
