import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useConfirmDialog, useConst, useFormDialog, useLoggerNotifier } from '@/hooks';
import { TableActionsFn } from '@/types';
import { UsuarioForm } from '../components';
import { useDeleteUsuarioMutation } from '../services';
import { Usuario } from '../types';

export function useUsuariosTableActions() {
  const { showConfirmDialog } = useConfirmDialog();
  const { showFormDialog } = useFormDialog();
  const { notify } = useLoggerNotifier();
  const [deleteUsuario] = useDeleteUsuarioMutation();

  return useConst<TableActionsFn<Usuario>>(() => (usuario: Usuario) => [
    {
      label: 'Editar',
      icon: <EditIcon color="secondary" />,
      onClick() {
        const modal = showFormDialog({
          icon: EditIcon,
          title: 'Editar usuario',
          width: 1000,
          children: <UsuarioForm usuario={usuario} onCompleted={() => modal.hide()} />,
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
              await deleteUsuario(usuario.id).unwrap();
              notify('Usuario eliminado exitosamente', 'success');
            } catch (error) {
              notify('Error al eliminar. Inténtalo de nuevo.', 'error', error);
            }
          },
        });
      },
    },
  ]);
}
