import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useConfirmDialog, useConst, useFormDialog, useLoggerNotifier } from '@/hooks';
import { TableActionsFn } from '@/types';
import { useDeletePreguntaMutation } from '../services';
import { Pregunta } from '../types';
import { PreguntaForm } from '../components';

export function usePreguntasTableActions() {
  const { showConfirmDialog } = useConfirmDialog();
  const { showFormDialog } = useFormDialog();
  const { notify } = useLoggerNotifier();
  const [deletePregunta] = useDeletePreguntaMutation();

  return useConst<TableActionsFn<Pregunta>>(() => (pregunta: Pregunta) => [
    {
      label: 'Editar',
      icon: <EditIcon color="secondary" />,
      onClick() {
        const modal = showFormDialog({
          icon: EditIcon,
          title: 'Editar pregunta',
          width: 1000,
          children: <PreguntaForm pregunta={pregunta} onCompleted={() => modal.hide()} />,
        });
      },
    },
    {
      label: 'Eliminar',
      icon: <DeleteIcon color="secondary" />,
      onClick() {
        showConfirmDialog({
          icon: DeleteIcon,
          destructive: true,
          checkbox: true,
          async onConfirm() {
            try {
              await deletePregunta(pregunta.id).unwrap();
              notify('Pregunta eliminada exitosamente', 'success');
            } catch (error) {
              notify('Error al eliminar. Inténtalo de nuevo.', 'error', error);
            }
          },
        });
      },
    },
  ]);
}
