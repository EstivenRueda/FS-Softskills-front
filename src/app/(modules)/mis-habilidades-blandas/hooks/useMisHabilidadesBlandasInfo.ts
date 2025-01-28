import { useRouter } from 'next/navigation';
import {
  useRetrieveMiGrupoCuestionarioQuery,
  useRetrieveMisHabilidadesBlandasQuery,
  useRetrieveMisResultadosQuery,
} from '../services';
import { useCreateGrupoCuestionarioMutation } from '../services/grupoCuestionariosApi';

export function useMisHabilidadesBlandasInfo() {
  const router = useRouter();

  const {
    data: miGrupoCuestionario,
    isLoading: miGrupoCuestionarioLoading,
    isError,
    error: miGrupoCuestionarioError,
  } = useRetrieveMiGrupoCuestionarioQuery();
  const { data: misResultados, isLoading: misResultadosLoading } = useRetrieveMisResultadosQuery();
  const { data: misHabilidadesBlandas, isLoading: misHabilidadesBlandasLoading } =
    useRetrieveMisHabilidadesBlandasQuery();
  const [createGrupoCuestionario, { isLoading: createGrupoCuestionarioLoading }] = useCreateGrupoCuestionarioMutation();

  const idx = misHabilidadesBlandas?.findIndex((habilidad) => habilidad.has_current_questionnaire === false) ?? -1;
  const hasIncompleteQuestionnaire = idx > -1;
  const formUrl = `/mis-habilidades-blandas/${misHabilidadesBlandas?.[idx]?.slug}/cuestionario`;
  const isInitialQuestionnaireGroup = misResultados && (!!!misResultados.length || misResultados.length === 1);

  const handleCreateGroupQuestionnaire = async (url: string) => {
    if (isError && !!miGrupoCuestionarioError) {
      const code = (miGrupoCuestionarioError as any)?.data?.errors?.[0]?.code;
      if (code === 'not_found') {
        // There is no questionnaire group for the user, so we create a new one
        await createGrupoCuestionario().unwrap();
      }
    }
    router.push(url);
  };

  const handleCreateNewGroupQuestionnaire = async (url: string) => {
    if (miGrupoCuestionario?.is_complete) {
      // There is already a questionnaire group created and completed, so we create a new one
      await createGrupoCuestionario().unwrap();
      const initialUrl = `/mis-habilidades-blandas/${misHabilidadesBlandas?.[0]?.slug}/cuestionario`;
      router.push(initialUrl);
    } else {
      // The questionnaire group is not completed yet
      router.push(url);
    }
  };

  return {
    misResultados,
    isLoading:
      miGrupoCuestionarioLoading ||
      misResultadosLoading ||
      misHabilidadesBlandasLoading ||
      createGrupoCuestionarioLoading,
    formUrl,
    isInitialQuestionnaireGroup,
    hasIncompleteQuestionnaire,
    handleCreateGroupQuestionnaire,
    handleCreateNewGroupQuestionnaire,
  };
}
