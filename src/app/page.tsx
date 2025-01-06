import { Metadata } from "next";
import { AppLayout } from "@/components";
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: "Finishing School | Home",
  description: "Finishing School",
};

type RootLayoutProps = PropsWithChildren;

export default function Home(props: RootLayoutProps) {
  const { children } = props;
  return (
    <html lang="es">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
