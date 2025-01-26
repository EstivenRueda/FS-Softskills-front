import { useRetrieveMisHabilidadesBlandasQuery, useRetrieveMisResultadosQuery } from '../services';

export function useMisHabilidadesBlandasInfo() {
  const { data: misHabilidadesBlandas, isLoading: misHabilidadesBlandasLoading } =
    useRetrieveMisHabilidadesBlandasQuery();

  const idx = misHabilidadesBlandas?.findIndex((habilidad) => habilidad.has_current_questionnaire === false) ?? -1;
  const hasFinished = idx === -1;
  const formUrl = `/mis-habilidades-blandas/${misHabilidadesBlandas?.[idx]?.slug}/cuestionario`;

  return { isLoading: misHabilidadesBlandasLoading, formUrl, hasFinished };
}
