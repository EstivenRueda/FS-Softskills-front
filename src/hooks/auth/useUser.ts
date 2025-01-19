import { useRetrieveUserQuery } from '@/services';

export function useUser() {
  const { data: user, isLoading } = useRetrieveUserQuery();

  return { user, isLoading };
}
