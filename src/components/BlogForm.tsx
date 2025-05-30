import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";

interface BlogFormProps {
  blog?: any;
  blogs: any[];
  onSubmit: () => void;
}

export default function BlogForm({ blog, blogs, onSubmit }: BlogFormProps) {
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [blog]);

  const handleSubmit = async () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Both Title and Content are required.");
      return;
    }

    const exactDuplicate = blogs.find(
      (b) =>
        b.title === title &&
        b.content === content &&
        b.id !== blog?.id
    );

    if (exactDuplicate) {
      alert("A blog with the same title and content already exists.");
      return;
    }

    const titleDuplicate = blogs.find(
      (b) =>
        b.title === title &&
        b.id !== blog?.id
    );

    if (titleDuplicate) {
      alert("This title already exists.");
      return;
    }

    setLoading(true);

    if (blog) {
      await supabase.from("blogs").update({ title, content }).eq("id", blog.id);
    } else {
      const user = (await supabase.auth.getUser()).data.user;
      await supabase.from("blogs").insert({ title, content, user_id: user?.id });
    }

    setLoading(false);
    onSubmit();
    setTitle("");
    setContent("");
  };

  return (
    <div className="my-4">
      <div className="input-wrapper">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className="border p-2 w-full my-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className="border p-2 w-full my-2"
          placeholder="Content"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        className="btn btn--primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : blog ? "Update" : "Create"} Blog
      </button>
    </div>
  );
}
