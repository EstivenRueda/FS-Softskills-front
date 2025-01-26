import { useEffect, useState } from 'react';
import { LoadingButton as Button } from '@mui/lab';
import { Box } from '@mui/material';
import { GoogleIcon } from './GoogleIcon';

type GoogleSignInProps = {
  isLoading?: boolean;
};

export function GoogleSignIn(props: GoogleSignInProps) {
  const { isLoading = false } = props;
  const [googleSignInUrl, setGoogleSignInUrl] = useState('');

  useEffect(() => {
    const googleCallbackUri = `${process.env.NEXT_PUBLIC_BASE_APP_URL}/login`;
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;

    const hostDomainRestriction = 'correounivalle.edu.co';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline&hd=${hostDomainRestriction}`;
    setGoogleSignInUrl(url);
  }, []);

  return (
    <Box my={2}>
      <Button
        variant="outlined"
        fullWidth
        size="large"
        disableElevation
        color="inherit"
        startIcon={<GoogleIcon />}
        href={googleSignInUrl}
        loading={!googleSignInUrl || isLoading}
      >
        <span>Iniciar sesión con Google</span>
      </Button>
    </Box>
  );
}
