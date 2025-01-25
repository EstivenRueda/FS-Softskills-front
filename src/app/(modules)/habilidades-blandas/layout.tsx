'use client';

import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import { Loading } from '@/components';
import { useAuth } from '@/hooks';

export default function HabilidadesBlandasLayout(props: PropsWithChildren) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (user && user.profile.type === 'STUDENT') {
    redirect('/');
  }

  return <>{props.children}</>;
}
