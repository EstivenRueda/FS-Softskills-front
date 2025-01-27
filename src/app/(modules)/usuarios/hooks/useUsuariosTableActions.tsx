import { Edit as EditIcon } from '@mui/icons-material';
import { useConst, useFormDialog } from '@/hooks';
import { TableActionsFn } from '@/types';
import { UsuarioForm } from '../components';
import { Usuario } from '../types';

export function useUsuariosTableActions() {
  const { showFormDialog } = useFormDialog();

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
  ]);
}
