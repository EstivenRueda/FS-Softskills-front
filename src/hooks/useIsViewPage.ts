import { usePathname } from 'next/navigation';

export function useIsViewPage() {
  const pathname = usePathname();
  return pathname.split('/').pop() === 'ver';
}
