import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type EditBlogModalProps = {
  show: boolean;
  onClose: () => void;
  onSave: (updatedBlog: FormData) => void;
  blog: {
    _id: string;
    title: string;
    content: string;
    image: string;
  } | null;
};

export default function EditBlogModal({
  show,
  onClose,
  onSave,
  blog,
}: EditBlogModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setPreview(blog.image);
    }
  }, [blog]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);

    onSave(formData);
    onClose();
  };

  if (!show || !blog) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">Edit Blog</h2>

        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded h-32"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded border"
          />
        )}

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
