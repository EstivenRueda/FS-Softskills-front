import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLoggerNotifier } from '@/hooks';
import { useSendEmailMutation } from '@/services';
import type { SendEmail } from '@/types';
import { useResetPasswordEmailResolver } from './useResetPasswordEmailResolver';

export function useResetPasswordEmailForm() {
  const router = useRouter();
  const [sendEmail, { isLoading }] = useSendEmailMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { notify } = useLoggerNotifier();
  const emailResolver = useResetPasswordEmailResolver();

  const formContext = useForm<SendEmail>({
    resolver: emailResolver,
    mode: 'onChange',
  });

  const handleSubmit = async (data: SendEmail) => {
    try {
      await sendEmail(data).unwrap();
      setErrorMessage(null);
      notify(
        'El correo de restablecimiento de contraseña ha sido enviado exitosamente. Por favor, revisa tu bandeja de entrada para continuar con el proceso.',
        'success'
      );

      router.push(`/login`);
    } catch (error: any) {
      setErrorMessage('Se produjo un error al enviar el correo de recuperacion.');
    }
  };

  return {
    formContext,
    handleSubmit,
    isLoading,
    errorMessage,
  };
}
