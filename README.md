# E-Commerce Application Module

This is a full-stack e-commerce application I built for the assignment. It includes a product listing page, user authentication, and role-based access control.

## What I Built

I created a mini e-commerce module with the following features:

- Product listing page that displays products in a grid layout (3 per row on desktop)
- Product detail pages where users can view full product information
- User login system with JWT authentication
- Role-based access - Admin users can add products, regular users can only view
- RESTful API for managing products and authentication

## Tech Stack

For the frontend, I used Next.js with React and TypeScript. I chose Next.js because it's good for building React apps and handles routing well. For styling, I used CSS Modules to keep styles organized.

The backend is built with Node.js and Express, also using TypeScript. I used MongoDB as the database because it's flexible and works well with Node.js. For authentication, I implemented JWT tokens.

## Project Structure

The project is split into two main folders:

**Backend** (`/backend`):
- Express server with TypeScript
- MongoDB models for Products and Users
- REST API endpoints
- JWT authentication middleware
- Database seeding script

**Frontend** (`/frontend`):
- Next.js pages for routing
- React components for reusable UI
- Context API for managing auth state
- CSS Modules for styling

## How to Run

### Prerequisites
You'll need Node.js installed (I used v18+) and MongoDB running locally, or you can use MongoDB Atlas.

### Backend Setup

1. Go to the backend folder and install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file in the backend folder with these variables:
```
DB_URI=mongodb://localhost:27017/mindwhiz
PORT=5000
SECRET_KEY=your-secret-key-here
```

If you're using MongoDB Atlas, replace the DB_URI with your connection string.

3. Seed the database with sample data:
```bash
npm run seed
```

This will create 5 sample products and 2 test users.

4. Start the backend server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Go to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```

2. Create a `.env.local` file in the frontend folder:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

I created these API endpoints:

- `GET /api/products` - Returns all products
- `GET /api/products/:id` - Returns a single product by ID
- `POST /api/products` - Creates a new product (Admin only, requires JWT token)
- `POST /api/login` - Authenticates user and returns JWT token

## Test Users

I've set up two test users for testing:

**Admin User:**
- Email: `admin@mindwhiz.com`
- Password: `admin123`
- Can add new products

**Customer User:**
- Email: `customer@mindwhiz.com`
- Password: `customer123`
- Can only view products

## Features Implemented

### Product Listing
- Grid layout showing product cards
- Each card displays product image, name, and price
- "View Details" button to see full product information
- Responsive design that works on mobile

### Product Details
- Full product information page
- Large product image
- Description, price, and availability status
- "Add to Cart" button (UI only, functionality not implemented)
- Back button to return to listing

### Authentication
- Login page with email and password
- JWT token stored in localStorage
- Protected routes for admin features
- User info displayed in header when logged in

### Admin Features
- "Add Product" button visible only to admin users
- Form to add new products with validation
- Products are saved to MongoDB

## Testing

I included some basic tests for the product controller. To run them:

```bash
cd backend
npm test
```

## Notes

- The authentication is a mock implementation for the assignment
- Product images use placeholder SVGs (you can replace with actual images)
- The "Add to Cart" functionality is just a UI placeholder
- I used CSS Modules for component styling to avoid style conflicts



If you have any questions about the implementation, feel free to ask!
