import { redirect } from 'next/navigation';
import { ParamsWithSlug } from '@/types';

export type HabilidadBlandapageProps = {
  params: ParamsWithSlug;
};

export default function HabilidadBlandapage(props: HabilidadBlandapageProps) {
  const { params } = props;
  redirect(`/habilidades-blandas/${params.slug}/ver`);
}
