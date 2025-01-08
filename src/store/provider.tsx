import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { createStore } from './store';

export type ReduxProviderProps = PropsWithChildren;

export function StoreProvider(props: ReduxProviderProps) {
  const { children } = props;
  const store = createStore();

  return <Provider store={store}>{children}</Provider>;
}
