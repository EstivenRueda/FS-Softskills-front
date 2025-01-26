import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useConst } from '@/hooks';
import { GoogleSignIn } from '../GoogleSignIn';
import { LoginForm } from '../LoginForm';

type LoginProps = {
  searchParams?: {
    code?: string;
    error?: string;
  };
};

export function Login(props: LoginProps) {
  const { searchParams } = props;
  const code = searchParams?.code ?? false;
  const error = searchParams?.error ?? false;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useConst(() => {
    const handleLogin = async (code: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/google/callback?code=${code}`, {
          credentials: 'include',
        });
        const data = await response.json();

        if (data?.access && data?.refresh) {
          const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({ refresh: data?.refresh }),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const refreshData = await verifyResponse.json();
          router.push('/mis-habilidades-blandas');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Hubo un error al iniciar sesion', 'error', error);
        router.push('/login');
        setIsLoading(false);
      }
    };

    if (error) {
      setIsLoading(true);
      console.error('Hubo un error al iniciar sesion', 'error', error);
      router.push('/login');
      setIsLoading(false);
    }

    if (code) {
      handleLogin(code);
    }
  });

  return (
    <Grid container alignItems={'center'} justifyContent={'center'} sx={{ backgroundColor: 'primary.light' }}>
      <Grid size={12}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            sx={{
              p: 6,
              backgroundColor: 'transparent',
              borderRadius: '20px',
              boxShadow: '0 0 0px rgba(0, 0, 0, 0.2)',
              alignContent: 'center',
            }}
          >
            <LoginForm isLoading={isLoading} />
            <GoogleSignIn isLoading={isLoading} />
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
