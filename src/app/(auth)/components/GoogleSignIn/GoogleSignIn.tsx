import { googleCallbackUri, googleClientId } from '../../constants';

export function GoogleSignIn() {
  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline`;

  return (
    <div style={{ padding: 20 }}>
      <a href={googleSignInUrl}>Sign in with Google</a>
    </div>
  );
}
