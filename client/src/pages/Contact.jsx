import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const openForm = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/customerquery/add`, {
        ...formData,
        type: formType,
      });

      if (response.data.success) {
        toast.success("Query submitted successfully!");
        setShowForm(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else toast.error(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit query");
    }
  };

  return (
    <div>
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"CONTACT"} text2={" US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb:28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Office</p>
          <p className="text-gray-500">
            123 Business District
            <br />
            Mumbai, Maharashtra 400001
          </p>
          <p className="text-gray-500">
            Tel:(+91) 98765 43210
            <br />
            Email:business@anantamart.com
          </p>

          <p className="font-semibold text-xl text-gray-600">
            Can't find what are you looking for??
          </p>
          <p className="text-gray-500">
            Our business specialists are here to help you find the perfect products for your needs.
          </p>

          <div className="flex align-items justify-center gap-5">
            <button
              onClick={() => openForm("Contact Specialist")}
              className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
            >
              Contact Specialist
            </button>
            <button
              onClick={() => openForm("Custom Quote")}
              className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">{formType}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border px-4 py-2 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
