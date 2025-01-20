import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Finishing School',
  description: 'Finishing School',
};

export default function HomePage() {
  redirect('/mis-habilidades-blandas');
  return null;
}
