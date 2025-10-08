
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token, triggerRefresh }) => {
  const [list, setList] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setList(response.data.products.reverse()); // latest first
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [triggerRefresh]); // refresh when parent triggers

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-2">All Product List</p>
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>
      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
        >
          <img className="w-12" src={item.image[0]} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>₹{item.price}</p>
          <p
            onClick={() => removeProduct(item._id)}
            className="md:text-center text-right cursor-pointer text-lg"
          >
            X
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;
