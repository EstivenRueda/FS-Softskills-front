import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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
        credentials: 'include',
      });

      const jwtData = await response.json();

      if (jwtData && jwtData.access) {
        return NextResponse.json({ access: jwtData.access, refresh: jwtData.refresh }, { status: 200 });
      } else {
        console.error('Unauthorized');
        throw new Response('Unauthorized', { status: 401 });
      }
    } catch (err) {
      console.error(err);
      throw new Response('Bad request', { status: 400 });
    }
  }

  throw new Response('Not Found', { status: 404 });
}
