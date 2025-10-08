import CustomerQuery from "../models/customerQueryModel.js";

// Add new query
export const addQuery = async (req, res) => {
  try {
    const { name, email, phone, message, type } = req.body;
    if (!name || !email || !type)
      return res.status(400).json({ success: false, message: "Name, email, and type are required" });

    const query = await CustomerQuery.create({ name, email, phone, message, type });
    res.json({ success: true, query });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// List all queries (admin only)
export const getQueries = async (req, res) => {
  try {
    const queries = await CustomerQuery.find().sort({ date: -1 });
    res.json({ success: true, queries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a query (admin marks completed)
export const deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;
    await CustomerQuery.findByIdAndDelete(id);
    res.json({ success: true, message: "Query completed and deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
