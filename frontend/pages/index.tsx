import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProductCard from '@/components/ProductCard';
import AddProductForm from '@/components/AddProductForm';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Home.module.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  imageUrl?: string;
  isTrashed: boolean;
  isActive: boolean;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProductSuccess = () => {
    setShowAddProduct(false);
    fetchProducts();
  };

  const handleLogin = () => {
    router.push('/login');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Mindwhiz - Product Listing</title>
        <meta name="description" content="Browse our products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>Mindwhiz</h1>
            <div className={styles.headerActions}>
            {user ? (
              <>
                {isAdmin && (
                  <button
                    className={styles.addProductButton}
                    onClick={() => setShowAddProduct(true)}
                  >
                    Add Product
                  </button>
                )}
                <span className={styles.userInfo}>{user.email}</span>
                <button className={styles.logoutButton} onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <button className={styles.loginButton} onClick={handleLogin}>
                Login
              </button>
            )}
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <h2 className={styles.pageTitle}>Product Listing</h2>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </main>

        {showAddProduct && (
          <AddProductForm
            onSuccess={handleAddProductSuccess}
            onCancel={() => setShowAddProduct(false)}
          />
        )}
      </div>
    </>
  );
}

