import { type PropsWithChildren, createContext, useContext } from 'react';
import type { FieldError } from 'react-hook-form';

export type FormErrorProviderProps = {
  onError: (error: FieldError) => string | undefined;
};

const FormErrorProviderContext = createContext<FormErrorProviderProps>({
  onError: (error) => error?.message,
});

export function FormErrorProvider({ onError, children }: PropsWithChildren<FormErrorProviderProps>) {
  return <FormErrorProviderContext.Provider value={{ onError }}>{children}</FormErrorProviderContext.Provider>;
}

export function useFormError() {
  const errorCtx = useContext<FormErrorProviderProps>(FormErrorProviderContext);
  return errorCtx?.onError;
}
