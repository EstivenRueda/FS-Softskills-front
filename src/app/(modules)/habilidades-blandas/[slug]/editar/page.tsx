import { ParamsWithSlug } from '@/types';
import { HabilidadBlandaForm } from '../../components';

export type HabilidadBlandaEditarpageProps = {
  params: ParamsWithSlug;
};

export default function HabilidadBlandaEditarpage(props: HabilidadBlandaEditarpageProps) {
  const { params } = props;
  return <HabilidadBlandaForm stepsEnabled={'*'} />;
}
