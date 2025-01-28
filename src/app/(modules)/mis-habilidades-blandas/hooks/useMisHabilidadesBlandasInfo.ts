import { useRouter } from 'next/navigation';
import { useRetrieveMiGrupoCuestionarioQuery, useRetrieveMisHabilidadesBlandasQuery } from '../services';
import { useCreateGrupoCuestionarioMutation } from '../services/grupoCuestionariosApi';

export function useMisHabilidadesBlandasInfo() {
  const router = useRouter();

  const {
    data: miGrupoCuestionario,
    isLoading: miGrupoCuestionarioLoading,
    isError,
    error: miGrupoCuestionarioError,
  } = useRetrieveMiGrupoCuestionarioQuery();
  const { data: misHabilidadesBlandas, isLoading: misHabilidadesBlandasLoading } =
    useRetrieveMisHabilidadesBlandasQuery();
  const [createGrupoCuestionario, { isLoading: createGrupoCuestionarioLoading }] = useCreateGrupoCuestionarioMutation();

  const idx = misHabilidadesBlandas?.findIndex((habilidad) => habilidad.has_current_questionnaire === false) ?? -1;
  const hasFinished = idx === -1;
  const formUrl = `/mis-habilidades-blandas/${misHabilidadesBlandas?.[idx]?.slug}/cuestionario`;

  const handleCreateGroupQuestionnaire = async (url: string) => {
    if (isError && !!miGrupoCuestionarioError) {
      // There is no questionnaire group for the user, so we create a new one
      const code = (miGrupoCuestionarioError as any)?.data?.errors?.[0]?.code;
      if (code === 'not_found') {
        await createGrupoCuestionario().unwrap();
      }
    }
    router.push(url);
  };

  const handleCreateNewGroupQuestionnaire = async () => {
    await createGrupoCuestionario().unwrap();
    const url = `/mis-habilidades-blandas/${misHabilidadesBlandas?.[0]?.slug}/cuestionario`;
    router.push(url);
  };

  return {
    isLoading: miGrupoCuestionarioLoading || misHabilidadesBlandasLoading || createGrupoCuestionarioLoading,
    formUrl,
    hasFinished,
    handleCreateGroupQuestionnaire,
    handleCreateNewGroupQuestionnaire,
  };
}
