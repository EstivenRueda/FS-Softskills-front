import type { FormEventHandler, PropsWithChildren } from 'react';
import type { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormProps, UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, type BoxProps } from '@mui/material';

export type FormContainerProps<T extends FieldValues = FieldValues> = PropsWithChildren<
  UseFormProps<T> & {
    onSuccess?: SubmitHandler<T>;
    onError?: SubmitErrorHandler<T>;
    FormProps?: BoxProps<'form'>;
    handleSubmit?: FormEventHandler<HTMLFormElement>;
    formContext?: UseFormReturn<T>;
  }
>;

export function FormContainer<TFieldValues extends FieldValues = FieldValues>(
  props: PropsWithChildren<FormContainerProps<TFieldValues>>
) {
  const { handleSubmit, children, FormProps, formContext, onSuccess, onError, ...useFormProps } = props;
  if (!formContext) {
    return (
      <FormProviderWithoutContext<TFieldValues> {...{ onSuccess, onError, FormProps, children, ...useFormProps }} />
    );
  }
  if (typeof onSuccess === 'function' && typeof handleSubmit === 'function') {
    console.warn('Property `onSuccess` will be ignored because handleSubmit is provided');
  }
  return (
    <FormProvider {...formContext}>
      <Box
        component="form"
        noValidate
        {...FormProps}
        onSubmit={
          handleSubmit
            ? handleSubmit
            : onSuccess
            ? formContext.handleSubmit(onSuccess, onError)
            : () => console.log('submit handler `onSuccess` is missing')
        }
      >
        {children}
      </Box>
    </FormProvider>
  );
}

function FormProviderWithoutContext<TFieldValues extends FieldValues = FieldValues>({
  onSuccess,
  onError,
  FormProps,
  children,
  ...useFormProps
}: PropsWithChildren<FormContainerProps<TFieldValues>>) {
  const methods = useForm<TFieldValues>({
    ...useFormProps,
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(
          onSuccess ? onSuccess : () => console.log('submit handler `onSuccess` is missing'),
          onError
        )}
        noValidate
        {...FormProps}
      >
        {children}
      </Box>
    </FormProvider>
  );
}
