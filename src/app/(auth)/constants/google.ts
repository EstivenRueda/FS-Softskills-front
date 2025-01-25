const { NEXT_PUBLIC_BASE_APP_URL, NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID } = process.env;
export const googleCallbackUri = `${NEXT_PUBLIC_BASE_APP_URL}/google/callback`;
export const googleClientId = NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
