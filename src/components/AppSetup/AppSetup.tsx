import type { PropsWithChildren } from 'react';
import { StoreProvider } from '@/store';

export type AppSetupProps = PropsWithChildren

export function AppSetup(props: AppSetupProps) {
  const { children } = props;

  return (
    <StoreProvider>

    </StoreProvider>
  )
}
