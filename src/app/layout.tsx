import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { AppSetup } from '@/components';

export const metadata: Metadata = {
  title: 'Finishing School',
  description: 'Software para la capacitación en habilidades blandas',
};

type RootLayoutProps = PropsWithChildren;

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="es">
      <body>
        <AppSetup>{children}</AppSetup>
      </body>
    </html>
  );
}
