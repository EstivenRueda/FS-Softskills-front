import { LoadingButton as Button } from '@mui/lab';
import { Box } from '@mui/material';
import { googleCallbackUri, googleClientId } from '../../constants';
import { GoogleIcon } from './GoogleIcon';

export function GoogleSignIn() {
  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline`;

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
