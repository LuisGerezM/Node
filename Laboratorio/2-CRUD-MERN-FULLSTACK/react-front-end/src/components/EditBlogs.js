import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = "http://localhost:8000/api/v1/blogs";

export const EditBlog = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    await axios.put(URI + "/" + id, {
      title,
      content,
    });
    navigate("/");
  };

  const getBlogById = async () => {
    const res = await axios.get(URI + "/" + id);
    setTitle(res.data.data.title);
    setContent(res.data.data.content);
  };

  useEffect(() => {
    getBlogById();
  }, []);

  return (
    <div className="col col-12 d-flex flex-column justify-content-center align-items-center mt-5">
      <h3>editar Post en Blog</h3>
      <form onSubmit={update}>
        <div>
          <label className="form-label">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mt-3">
          <label className="form-label">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} type="text" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary my-4">
          Editar
        </button>
      </form>
    </div>
  );
};
