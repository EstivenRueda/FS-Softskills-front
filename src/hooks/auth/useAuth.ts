import { useAppSelector } from '@/store';

export function useAuth() {
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);

  return { isAuthenticated, isLoading, user };
}
