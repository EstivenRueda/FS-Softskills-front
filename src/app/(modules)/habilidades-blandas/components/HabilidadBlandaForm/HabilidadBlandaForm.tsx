import { FormStepper } from '@/components';
import { useHabilidadBlandaSteps } from '../../hooks';

export type HabilidadBlandaFormProps = {
  stepsEnabled: string | string[];
};

export function HabilidadBlandaForm(props: HabilidadBlandaFormProps) {
  const { stepsEnabled } = props;
  const formSteps = useHabilidadBlandaSteps();

  return <FormStepper steps={formSteps} stepsEnabled={stepsEnabled} />;
}
