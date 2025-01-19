import { useCallback, useEffect } from 'react';
import { useRetrieveUserQuery, useVerifyMutation } from '@/services';
import { setIsAuthenticated, setIsLoading, setUser, useAppDispatch } from '@/store';

export function useVerify() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();
  const { data: user, isLoading } = useRetrieveUserQuery();
  const verifyToken = useCallback(async () => {
    try {
      await verify(undefined).unwrap();
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      dispatch(setIsAuthenticated(false));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, verify]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  useEffect(() => {
    if (!isLoading && user) {
      dispatch(setUser(user));
    }
  }, [isLoading, user]);
}
