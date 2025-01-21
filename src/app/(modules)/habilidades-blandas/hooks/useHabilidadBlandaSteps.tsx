import {
  Psychology as PsychologyIcon,
  Filter as FilterIcon,
  Quiz as QuizIcon
} from '@mui/icons-material';
import { useConst } from '@/hooks';
import { CapacitacionesTable, HabilidadBlandaInfoForm, PreguntasTable } from '../components';

export function useHabilidadBlandaSteps() {
  return useConst([
    {
      name: 'habilidad-info',
      title: 'Habilidad blanda',
      icon: <PsychologyIcon fontSize="large" />,
      component: <HabilidadBlandaInfoForm />
    },
    {
      name: 'preguntas-table',
      title: 'Preguntas',
      icon: <QuizIcon fontSize="large" />,
      component: <PreguntasTable />
    },
    {
      name: 'capacitaciones-table',
      title: 'Capacitaciones',
      icon: <FilterIcon fontSize="large" />,
      component: <CapacitacionesTable />
    }
  ]);
}
