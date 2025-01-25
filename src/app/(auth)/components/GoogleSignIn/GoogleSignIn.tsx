import { LoadingButton as Button } from '@mui/lab';
import { Box } from '@mui/material';
import { GoogleIcon } from './GoogleIcon';

export function GoogleSignIn() {
  const { NEXT_PUBLIC_BASE_APP_URL, NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID } = process.env;
  const googleCallbackUri = `${NEXT_PUBLIC_BASE_APP_URL}/google/callback`;
  const googleClientId = NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;

  const hostDomainRestriction = 'correounivalle.edu.co';
  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline&hd=${hostDomainRestriction}`;

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
      >
        <span>Iniciar sesión con Google</span>
      </Button>
    </Box>
  );
}
