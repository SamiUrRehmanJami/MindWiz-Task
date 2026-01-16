import { Request, Response } from 'express';
import { getAllProducts, getProductById } from '../controllers/productController';
import Product from '../models/productModel';

// Mock the Product model
jest.mock('../models/productModel');

describe('Product Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
    mockRequest = {};
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [
        { _id: '1', name: 'Product 1', price: 25 },
        { _id: '2', name: 'Product 2', price: 30 },
      ];

      (Product.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockProducts),
      });

      await getAllProducts(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(mockProducts);
    });

    it('should handle errors', async () => {
      (Product.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await getAllProducts(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to fetch products' });
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      const mockProduct = { _id: '1', name: 'Product 1', price: 25 };
      mockRequest.params = { id: '1' };

      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);

      await getProductById(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(mockProduct);
    });

    it('should return 404 if product not found', async () => {
      mockRequest.params = { id: '999' };

      (Product.findById as jest.Mock).mockResolvedValue(null);

      await getProductById(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Product not found' });
    });
  });
});

