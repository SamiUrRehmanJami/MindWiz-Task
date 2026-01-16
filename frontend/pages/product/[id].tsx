import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/ProductDetail.module.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  isTrashed: boolean;
  isActive: boolean;
  imageUrl?: string;
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id as string);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Optional: Implement cart functionality
    alert('Product added to cart!');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Product not found</p>
          <Link href="/" className={styles.backLink}>
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - Mindwhiz</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.container}>
        <div className={styles.backButton}>
          <Link href="/" className={styles.backLink}>
            ← Back to Products
          </Link>
        </div>

        <div className={styles.productDetail}>
          <div className={styles.imageSection}>
            <img
              src={product.imageUrl || '/images/placeholder.svg'}
              alt={product.name}
              className={styles.productImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder.svg';
              }}
            />
          </div>

          <div className={styles.detailsSection}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <p className={styles.availability}>
              Availability: <span className={product.availability == true ? styles.inStock : styles.outOfStock}>
                {product.availability == true ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
            <div className={styles.description}>
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>
            <div className={styles.actions}>
              {product.availability == true && (
                <button
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
