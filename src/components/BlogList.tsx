import { supabase } from "../supabase/client";

interface BlogListProps {
  blogs: any[];
  onEdit: (blog: any) => void;
  onDelete: () => void;
}

export default function BlogList({ blogs, onEdit, onDelete }: BlogListProps) {
  const handleDelete = async (id: string) => {
    await supabase.from("blogs").delete().eq("id", id);
    onDelete();
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} className="border p-4 my-2 rounded-md">
          <h3 className="text-xl font-semibold">{blog.title}</h3>
          <p className="text-gray-700">{blog.content}</p>
          <div className="mt-2">
            <button className="text-blue-500 mr-4" onClick={() => onEdit(blog)}>Edit</button>
            <button className="text-red-500" onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
