const { BASE_APP_URL, GOOGLE_OAUTH_CLIENT_ID } = process.env;
export const googleCallbackUri = `${BASE_APP_URL}/google/callback`;
export const googleClientId = GOOGLE_OAUTH_CLIENT_ID;
