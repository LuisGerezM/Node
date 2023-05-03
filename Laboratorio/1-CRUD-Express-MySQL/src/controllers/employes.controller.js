import { pool } from "../db/db.js";

const getEmployes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Something goes wrong - Algo va mal",
    });
  }
};

const getEmploye = async (req, res) => {
  const fetchId = parseInt(req.params.id);

  try {
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [fetchId]);

    const response = rows.length ? { succes: true, data: rows[0] } : { succes: false, message: "Employe Not Found" };
    const status = rows.length ? 200 : 404;

    res.status(status).json(response);
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Something goes wrong - Algo va mal",
    });
  }
};

const createEmploye = async (req, res) => {
  console.log(req.body);
  const { name, salary } = req.body;

  try {
    const [rows] = await pool.query("INSERT INTO employees (name, salary) VALUES (?, ?)", [name, salary]);
    res.send({ succes: true, data: { id: rows.insertId } });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Something goes wrong - Algo va mal",
    });
  }
};

const deleteEmploye = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employees WHERE id = ?", [req.params.id]);

    const response = result.affectedRows > 0 ? { succes: true } : { succes: false, message: "Employe Not Found" };
    const status = result.affectedRows > 0 ? 204 : 404;
    console.log(result);

    res.status(status).json(response);
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Something goes wrong - Algo va mal",
    });
  }
};

const updateAllDataEmploye = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const [result] = await pool.query("UPDATE employees SET name = ?, salary = ? WHERE id = ?", [name, salary, id]);

    if (result.affectedRows === 0) return res.status(404).json({ succes: false, message: "Employe Not Found" });

    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [id]);

    res.json({ status: true, data: rows[0] });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Something goes wrong - Algo va mal",
    });
  }
};

const updateEmploye = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const [result] = await pool.query("UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?", [name, salary, id]);

    console.log(result);

    if (result.affectedRows === 0) return res.status(404).json({ succes: false, message: "Employe Not Found" });

    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [id]);

    res.json({ status: true, data: rows[0] });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Something goes wrong - Algo va mal",
    });
  }
};

export { getEmployes, getEmploye, createEmploye, updateAllDataEmploye, updateEmploye, deleteEmploye };
