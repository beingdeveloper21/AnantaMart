import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const categories = [
    { label: "Transportation", value: "transportation" },
    { label: "Building Materials", value: "building-materials" },
    { label: "Electrical Supplies", value: "electrical-supplies" },
    { label: "Safety Equipment", value: "safety-equipment" },
    { label: "Office Furniture", value: "office-furniture" },
    { label: "Industrial Equipment", value: "industrial-equipment" },
    { label: "Office Supplies", value: "office-supplies" },
    { label: "Electronics", value: "electronics" },
  ];

  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0].value);
  const [bestseller, setBestseller] = useState(false);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);


      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory(categories[0].value);
        setImages([null, null, null, null]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <form onSubmit={onSubmitHandler} className="flex flex-col w-full gap-4">
        <div>
          <p className="mb-2 font-medium">Upload Images</p>
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <label key={idx} htmlFor={`image${idx}`} className="cursor-pointer">
                <img
                  className="w-20 h-20 object-cover border"
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  alt={`upload ${idx + 1}`}
                />
                <input
                  type="file"
                  id={`image${idx}`}
                  hidden
                  onChange={(e) => handleImageChange(idx, e.target.files[0])}
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2">Product Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            className="w-full max-w-[500px] px-3 py-2 border"
            required
          />
        </div>

        <div>
          <p className="mb-2">Product Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write content here"
            className="w-full max-w-[500px] px-3 py-2 border"
            required
          />
        </div>

        <div>
          <p className="mb-2">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
            className="w-full max-w-[120px] px-3 py-2 border"
            required
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
          <label htmlFor="bestseller">Bestseller</label>
        </div>

        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
      </form>
    </div>
  );
};

export default Add;
