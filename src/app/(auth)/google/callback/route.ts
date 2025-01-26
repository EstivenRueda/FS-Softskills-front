import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  let redirectPath = '/login';

  if (error) {
    // error could be access_denied
    redirect(redirectPath);
  }

  if (code) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google/`, {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const cookies = response.headers.getSetCookie();

      const jwtData = await response.json();

      console.log('jwtData');
      console.log(jwtData);

      console.log('cookies');
      console.log(cookies);

      if (jwtData && jwtData.access) {
        if (cookies) {
          // We are using cookies to authenticate in the backend so we need to set those here too
          console.log('setting cookies');
          cookies.forEach((cookie) => {
            const cookieParts = cookie.split(';');
            const [name, value] = cookieParts[0].split('=');
            const cookieOptions: ResponseCookie = { name, value };

            cookieParts.forEach((part) => {
              const [key, val] = part.trim().split('=');
              if (key.toLowerCase() === 'expires') {
                cookieOptions.expires = new Date(val);
              } else if (key.toLowerCase() === 'max-age') {
                cookieOptions.maxAge = parseInt(val, 10);
              } else if (key.toLowerCase() === 'path') {
                cookieOptions.path = val;
              } else if (key.toLowerCase() === 'samesite') {
                cookieOptions.sameSite = val as 'lax' | 'strict' | 'none';
              }
            });

            cookieStore.set(cookieOptions);
          });
          console.log('cookies set');
        }
        redirectPath = '/mis-habilidades-blandas';
        console.log('redirectPath');
        console.log(redirectPath);
      } else {
        console.error('Unauthorized');
        // throw new Response('Unauthorized', { status: 401 });
      }
    } catch (err) {
      console.error(err);
      // throw new Response('Bad request', { status: 400 });
    } finally {
      redirect(redirectPath);
    }
  }

  redirect('/login');
  throw new Response('Not Found', { status: 404 });
}
