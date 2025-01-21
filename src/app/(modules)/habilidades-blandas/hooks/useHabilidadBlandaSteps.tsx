import { Psychology as PsychologyIcon } from '@mui/icons-material';
import { useConst } from '@/hooks';
import { HabilidadBlandaInfoForm, PreguntasTable } from '../components';

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
      icon: <PsychologyIcon fontSize="large" />,
      component: <PreguntasTable />
    }
  ]);
}
