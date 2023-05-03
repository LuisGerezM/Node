import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = "http://localhost:8000/api/v1/blogs";

export const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    axios.post(URI, { title, content });
    navigate("/");
  };

  return (
    <div className="col col-12 d-flex flex-column justify-content-center align-items-center mt-5">
      <h3>Create Post en Blog</h3>
      <form onSubmit={store}>
        <div>
          <label className="form-label">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mt-3">
          <label className="form-label">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} type="text" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary my-4">
          Enviar
        </button>
      </form>
    </div>
  );
};
