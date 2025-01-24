import { useRouter } from 'next/navigation';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useConfirmDialog, useConst, useFormDialog, useLoggerNotifier } from '@/hooks';
import { TableActionsFn } from '@/types';
import { CapacitacionForm } from '../components';
import { useDeleteCapacitacionMutation } from '../services';
import { Capacitacion } from '../types';

export function useCapacitacionesTableActions() {
  const route = useRouter();
  const { showFormDialog } = useFormDialog();
  const { showConfirmDialog } = useConfirmDialog();
  const { notify } = useLoggerNotifier();
  const [deleteCapacitacion] = useDeleteCapacitacionMutation();

  return useConst<TableActionsFn<Capacitacion>>(() => (capacitacion: Capacitacion) => [
    {
      label: 'Editar',
      icon: <EditIcon color="secondary" />,
      onClick() {
        const modal = showFormDialog({
          icon: EditIcon,
          title: 'Editar capacitacion',
          width: 1000,
          children: <CapacitacionForm capacitacion={capacitacion} onCompleted={() => modal.hide()} />,
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
              await deleteCapacitacion(capacitacion.id).unwrap();
              notify('Capacitación eliminada exitosamente', 'success');
            } catch (error) {
              notify('Error al eliminar. Inténtalo de nuevo.', 'error', error);
            }
          },
        });
      },
    },
  ]);
}
