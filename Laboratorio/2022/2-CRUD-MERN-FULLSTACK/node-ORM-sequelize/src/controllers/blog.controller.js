import BlogModel from "../models/Blog.model.js";

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.findAll();
    res.json({ status: "OK", data: blogs, message: "" });
  } catch (error) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    console.log(blog);
    const dataToResponse = !blog.length ? [] : blog[0];
    res.json({ status: "OK", data: dataToResponse, message: "" });
  } catch (error) {
    res.json({ status: "FAILED", message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    await BlogModel.create(req.body);
    res.json({ status: "OK", data: req.body, message: "Registro creado correctamente" });
  } catch (error) {
    res.json({ status: "FAILED", message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    await BlogModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ status: "OK", data: req.body, message: "Registro actualizado correctamente" });
  } catch (error) {
    res.json({ status: "FAILED", message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await BlogModel.destroy({
      where: { id: req.params.id },
    });
    res.json({ status: "OK", data: req.params.id, message: "Registro eliminado correctamente" });
  } catch (error) {
    res.json({ status: "FAILED", message: error.message });
  }
};

export { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog };
