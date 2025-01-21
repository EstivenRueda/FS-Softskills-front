import { useRouter } from 'next/navigation';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useConst } from '@/hooks';
import { TableActionsFn } from '@/types';
import { Pregunta } from '../types';

export function usePreguntasTableActions() {
  const route = useRouter();

  return useConst<TableActionsFn<Pregunta>>(() => (pregunta: Pregunta) => [
    {
      label: 'Editar',
      icon: <EditIcon color="secondary" />,
      onClick() {
        route.push(`/preguntas/${pregunta.id}/editar`);
      },
    },
    {
      label: 'Eliminar',
      icon: <DeleteIcon color="secondary" />,
      onClick() {
        route.push(`/preguntas/${pregunta.id}/editar`);
      },
    },
  ]);
}
