import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Login - Mindwhiz</title>
        <meta name="description" content="Login to Mindwhiz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm />
    </>
  );
}

