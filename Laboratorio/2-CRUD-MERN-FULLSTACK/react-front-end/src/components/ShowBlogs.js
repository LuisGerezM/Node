import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:8000/api/v1/blogs";

export const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const res = await axios.get(URI);
    setBlogs(res.data.data);
  };

  const deleteBlog = async (id) => {
    await axios.delete(`${URI}/${id}`);
    getBlogs();
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/create" className="btn btn-primary my-5 col col-3">
            Crear <i className="fas fa-plus" />
          </Link>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((element) => (
                <tr key={element.id}>
                  <td>{element.title}</td>
                  <td>{element.content}</td>
                  <td>
                    <Link to={`/edit/${element.id}`} className="btn btn-success">
                      <i className="fas fa-edit" />
                    </Link>
                    <button onClick={() => deleteBlog(element.id)} className="btn btn-danger">
                      <i className="fas fa-trash-alt" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
