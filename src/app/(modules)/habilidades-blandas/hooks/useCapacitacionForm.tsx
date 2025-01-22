import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useIsViewPage, useLoggerNotifier } from '@/hooks';
import { scrollToTop } from '@/utils';
import { useRetrieveCapacitacionQuery } from '../services';


export function useCapacitacionForm() {
  const router = useRouter();
  const { notify } = useLoggerNotifier();
  const isViewPage = useIsViewPage();


  return
}
