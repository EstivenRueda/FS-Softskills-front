import { ParamsWithSlug } from '@/types';
import { HabilidadBlandaForm } from '../../components';

export type HabilidadBlandaVerpageProps = {
  params: ParamsWithSlug;
};

export default function HabilidadBlandaVerpage(props: HabilidadBlandaVerpageProps) {
  const { params } = props;
  return <HabilidadBlandaForm stepsEnabled={'*'} />;
}
