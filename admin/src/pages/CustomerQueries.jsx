import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CustomerQueries = () => {
  const [queries, setQueries] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const fetchQueries = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/customerquery/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) setQueries(response.data.queries);
      else toast.error(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch queries");
    }
  };

  const markCompleted = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/customerquery/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success("Query marked completed!");
        setQueries(queries.filter((q) => q._id !== id));
      } else toast.error(response.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark completed");
    }
  };

   useEffect(() => {
    // Initial fetch
    fetchQueries();

    // Polling: fetch queries every 15 seconds
    const interval = setInterval(() => {
      fetchQueries();
    }, 2000); // 15000 ms = 15 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Queries</h2>
      {queries.length === 0 ? (
        <p>No queries found.</p>
      ) : (
        <div className="space-y-4">
          {queries.map((q) => (
            <div key={q._id} className="border p-4 rounded shadow flex justify-between items-start">
              <div>
                <p><b>Name:</b> {q.name}</p>
                <p><b>Email:</b> {q.email}</p>
                <p><b>Phone:</b> {q.phone || "N/A"}</p>
                <p><b>Type:</b> {q.type}</p>
                <p><b>Message:</b> {q.message || "N/A"}</p>
                <p><b>Date:</b> {new Date(q.date).toLocaleString()}</p>
              </div>
              <button
                onClick={() => markCompleted(q._id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Complete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerQueries;
