import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/productModel';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import { connectDB } from './database';

dotenv.config();

const products = [
  {
    name: 'Product 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus leo id nisl pulvinar, id dapibus quam ultrices.',
    price: 25.00,
    availability: true,
    imageUrl: '/images/placeholder.svg',
  },
  {
    name: 'Product 2',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    price: 30.00,
    availability: true,
    imageUrl: '/images/placeholder.svg',
  },
  {
    name: 'Product 3',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    price: 15.00,
    availability: false,
    imageUrl: '/images/placeholder.svg',
  },
  {
    name: 'Product 4',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 12.00,
    availability: false,
    imageUrl: '/images/placeholder.svg',
  },
  {
    name: 'Product 5',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    price: 20.00,
    availability: true,
    imageUrl: '/images/placeholder.svg',
  },
  {
    name: 'Product 6',
    description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    price: 50.00,
    availability: true,
    imageUrl: '/images/placeholder.svg',
  },
];

const users = [
  {
    email: 'admin@mindwhiz.com',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    email: 'customer@mindwhiz.com',
    password: 'customer123',
    role: 'customer' as const,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    await User.deleteMany({});

    const insertedProducts = await Product.insertMany(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );
    const insertedUsers = await User.insertMany(hashedUsers);
    console.log(`Inserted ${insertedUsers.length} users`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

