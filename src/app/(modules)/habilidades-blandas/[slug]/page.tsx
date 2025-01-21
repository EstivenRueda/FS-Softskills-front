import { ParamsWithSlug } from '@/types';
import { redirect } from 'next/navigation';

export type HabilidadBlandapageProps = {
  params: ParamsWithSlug;
};

export default function HabilidadBlandapage(props: HabilidadBlandapageProps) {
  const { params } = props;
  redirect(`/habilidades-blandas/${params.slug}/ver`);
}
