import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AddProductForm from '@/components/AddProductForm';
import { useAuth } from '../contexts/AuthContext';

export default function AddProduct() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (!isAdmin) {
      router.push('/');
    } else {
      setShowForm(true);
    }
  }, [user, isAdmin, router]);

  const handleSuccess = () => {
    router.push('/');
  };

  const handleCancel = () => {
    router.push('/');
  };

  if (!showForm) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Add Product - Mindwhiz</title>
        <meta name="description" content="Add a new product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddProductForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </>
  );
}

