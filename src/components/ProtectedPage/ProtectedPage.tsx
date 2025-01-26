import React from 'react';
import type { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { useAuth, useVerify } from '@/hooks';

type ProtectedRouteProps = PropsWithChildren;

export function ProtectedPage(props: ProtectedRouteProps) {
  const { children } = props;
  useVerify();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    redirect('/login');
  }

  return <>{children}</>;
}

export function Loading() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={60} color="primary" />
    </Box>
  );
}
