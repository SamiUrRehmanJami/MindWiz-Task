import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ProductCard.module.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.imageUrl || '/images/placeholder.svg'}
          alt={product.name}
          className={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.svg';
          }}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <button
          className={styles.viewButton}
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

