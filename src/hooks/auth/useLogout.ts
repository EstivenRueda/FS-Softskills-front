import { baseApi, useLogoutMutation } from '@/services';
import { setIsAuthenticated, setUser, useAppDispatch } from '@/store';
import { useLoggerNotifier } from '../useLoggerNotifier';

export function useLogout() {
  const { notify } = useLoggerNotifier();
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      dispatch(baseApi.util.resetApiState());
    } catch (error) {
      notify('Se produjo un error al intentar cerrar la sesión. Inténtalo de nuevo.', 'error', error);
    }
  };

  return { handleLogout, isLoading };
}
