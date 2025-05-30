import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import BlogForm from "../components/BlogForm";
import { useNavigate } from "react-router-dom";
import "../styles/style.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [page, setPage] = useState(1);
  const limit = 5;
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })
      .range(start, end);
    setBlogs(data || []);
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await supabase.auth.signOut();
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const thStyle: React.CSSProperties = {
    padding: "1rem",
    border: "1px solid #ccc",
    textAlign: "left",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.05rem",
  };

  const tdStyle: React.CSSProperties = {
    padding: "1rem",
    border: "1px solid #ccc",
    verticalAlign: "top",
  };

  const disabledBtnStyle: React.CSSProperties = {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
    cursor: "not-allowed",
  };

  return (
    <div className="form mt-10">
      <div className="form-inner max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">Dashboard</h2>
          <button
            onClick={handleLogout}
            className="btn btn--primary"
          >
            Logout
          </button>
        </div>

        <div className="max-w-lg mx-auto">
          <BlogForm
            blog={editingBlog}
            blogs={blogs}
            onSubmit={() => {
              setEditingBlog(null);
              fetchBlogs();
            }}
          />
        </div>

        <div className="overflow-x-auto mt-8">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-indigo-100 sticky top-0">
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Content</th>
                <th style={thStyle}>Created At</th>
                <th
                  style={{ ...thStyle, textAlign: "center" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              )}
              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-indigo-50 transition cursor-pointer"
                >
                  <td style={tdStyle}>{blog.title}</td>
                  <td style={{ ...tdStyle, maxWidth: "200px" }}>{blog.content}</td>
                  <td style={tdStyle}>
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      aria-label="Edit blog"
                      className="btn btn--primary"
                      onClick={() => setEditingBlog(blog)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      aria-label="Delete blog"
                      className="btn btn--primary bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this blog?")) {
                          supabase
                            .from("blogs")
                            .delete()
                            .eq("id", blog.id)
                            .then(() => fetchBlogs());
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="mt-6"
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "200px",
            margin: "auto",
          }}
        >
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`btn rounded ${
              page === 1
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "btn--primary"
            } transition`}
            style={page === 1 ? disabledBtnStyle : undefined}
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="btn btn--primary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
