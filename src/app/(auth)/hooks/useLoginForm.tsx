import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Lock as LockIcon } from '@mui/icons-material';
import { useFormDialog } from '@/hooks';
import { useLoginMutation } from '@/services';
import { setIsAuthenticated, setUser, useAppDispatch } from '@/store';
import { UserCredentials } from '@/types';
import { ResetPasswordEmailForm } from '../components';
import { useLoginFormResolver } from './useLoginFormResolver';

export function useLoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showFormDialog } = useFormDialog();
  const loginResolver = useLoginFormResolver();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const formContext = useForm<UserCredentials>({
    resolver: loginResolver,
    mode: 'onChange',
  });

  const handleSubmit = async (data: UserCredentials) => {
    try {
      const response = await login(data).unwrap();

      if (response?.access && response?.refresh) {
        setErrorMessage(null);
        handleLogin(response);
      }
    } catch (error: any) {
      const errorCode = error?.data?.errors?.[0]?.code;
      const errorDetail = error?.data?.errors?.[0]?.detail;

      if (errorCode === 'invalid') {
        setErrorMessage('No se puede iniciar sesión con las credenciales proporcionadas.');
      }
    }
  };

  const handleLogin = (response: any) => {
    dispatch(setIsAuthenticated(true));
    dispatch(setUser(response?.user));
    router.push('/mis-habilidades-blandas');
  };

  const handleForgotPasswordClick = () => {
    const modal = showFormDialog({
      icon: LockIcon,
      title: 'Cambiar contraseña',
      width: 500,
      children: <ResetPasswordEmailForm onClose={() => modal.hide()} />,
    });
  };

  return {
    formContext,
    handleSubmit,
    isLoadingLogin,
    errorMessage,
    handleClickShowPassword,
    showPassword,
    handleForgotPasswordClick,
  };
}
