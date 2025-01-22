import { useRouter } from 'next/navigation';
import { Edit as EditIcon, QuestionMark as QuestionMarkIcon, Filter as FilterIcon } from '@mui/icons-material';
import { useConst, useFormDialog } from '@/hooks';
import { TableActionsFn } from '@/types';
import { Capacitacion } from '../types';
import { CapacitacionForm } from '../components/CapacitacionForm';

export function useCapacitacionesTableActions() {
  const route = useRouter();
  const { showFormDialog } = useFormDialog();


  return useConst<TableActionsFn<Capacitacion>>(() => (capacitacion: Capacitacion) => [
    {
      label: 'Editar',
      icon: <EditIcon color="secondary" />,
      onClick() {
        const modal = showFormDialog({
          icon: EditIcon,
          title: 'Editar capacitacion',
          width: 1000,
          //children: <CapacitacionForm capacitacion={capacitacion} onCompleted={() => modal.hide()} />,
        });
      },
    },
  ]);
}
