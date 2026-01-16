import { Request, Response } from 'express';
import Product from '../models/productModel';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, availability, imageUrl } = req.body;

    if (!name || !description || price === undefined) {
      res.status(400).json({ error: 'Name, description, and price are required' });
      return;
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      availability: availability || true,
      imageUrl: imageUrl || '/images/placeholder.svg',
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

