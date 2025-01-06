import React from 'react'
import type { PropsWithChildren } from 'react';

type ProtectedRouteProps = PropsWithChildren;

export function ProtectedPage(props: ProtectedRouteProps) {
    const {children} = props;
  return (
    <>{children}</>
  )
}
