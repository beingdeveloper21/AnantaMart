import express from 'express';
import { addProduct, removeProduct, listProducts, singleProduct } from '../controllers/productController.js';
import adminAuth from '../middlewares/adminAuth.js';
import upload from '../middlewares/multer.js';

const productRouter = express.Router();

// Add product (with image upload)
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

// Remove product
productRouter.post('/remove', adminAuth, removeProduct);

// Single product info
productRouter.post('/single', singleProduct);

// List all products
productRouter.get('/list', listProducts);

export default productRouter;
