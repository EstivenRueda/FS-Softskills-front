import type { PropsWithChildren } from 'react';
import { AppLayout } from '@/components';

type ModuleLayoutProps = PropsWithChildren;

export default function ModuleLayout(props: ModuleLayoutProps) {
  const { children } = props;

  return <AppLayout>{children}</AppLayout>;
}
