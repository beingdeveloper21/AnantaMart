import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, bestseller } = req.body;

    // Collect uploaded files
    const imagesArr = ['image1', 'image2', 'image3', 'image4']
      .map(field => req.files[field] ? req.files[field][0] : undefined)
      .filter(Boolean);

    // Upload to Cloudinary
    const imagesURL = await Promise.all(
      imagesArr.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    // Prepare product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      bestseller: bestseller === 'true',
      image: imagesURL,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    // Return product so frontend can show instantly
    res.json({ success: true, message: 'Product Added', product });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product Removed' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
