import { Edit as EditIcon } from '@mui/icons-material';
import { useConst, useFormDialog } from '@/hooks';
import { TableActionsFn } from '@/types';
import { CuestionarioResult } from '../../mis-habilidades-blandas/types';
import { CuestionarioResultForm } from '../components';

export function useResultadosTableActions() {
  const { showFormDialog } = useFormDialog();

  return useConst<TableActionsFn<CuestionarioResult>>(() => (cuestionario: CuestionarioResult) => [
    {
      label: 'Editar',
      icon: <EditIcon color="secondary" />,
      onClick() {
        const modal = showFormDialog({
          icon: EditIcon,
          title: 'Editar cuestionario',
          subtitle: cuestionario.attendee_name,
          width: 1000,
          children: <CuestionarioResultForm cuestionario={cuestionario} onCompleted={() => modal.hide()} />,
        });
      },
    },
  ]);
}
