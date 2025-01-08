import type { PropsWithChildren } from 'react';
import { SnackbarProvider } from 'notistack';
import { StoreProvider } from '@/store';
import { ThemeRegistry } from '../ThemeRegistry';
import { ModalProvider } from '../forms';

export type AppSetupProps = PropsWithChildren;

export function AppSetup(props: AppSetupProps) {
  const { children } = props;

  return (
    <StoreProvider>
      <ThemeRegistry>
        <SnackbarProvider>
          <ModalProvider>{children}</ModalProvider>
        </SnackbarProvider>
      </ThemeRegistry>
    </StoreProvider>
  );
}
