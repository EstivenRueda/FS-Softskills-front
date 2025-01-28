import { BarChart } from '@mui/x-charts';
import { formatDateAndHour } from '@/utils';
import { GrupoCuestionarioConsolidado } from '../../types';

export type MisResultadosProps = {
  misResultados: GrupoCuestionarioConsolidado[];
};

export function MisResultados(props: MisResultadosProps) {
  const { misResultados } = props;

  const resultados =
    misResultados?.map((grupoCuestionarioConsolidado) => {
      return {
        isComplete: grupoCuestionarioConsolidado.is_complete,
        createdAt: grupoCuestionarioConsolidado.created_at,
        dataset: grupoCuestionarioConsolidado.questionnaires.map((cuestionarioResult) => ({
          softskill_name: cuestionarioResult.softskill_name,
          grade: cuestionarioResult.grade,
        })),
      };
    }) ?? [];

  return (
    <>
      {resultados.map((resultado, index) => {
        if (resultado.isComplete) {
          return (
            <BarChart
              key={`results-dataset-${index}`}
              dataset={resultado.dataset}
              yAxis={[
                {
                  scaleType: 'band',
                  dataKey: 'softskill_name',
                  valueFormatter: (name, context) => (context.location === 'tick' ? abbreviate(name) : name),
                },
              ]}
              xAxis={[{ label: 'Puntaje', max: 100 }]}
              series={[
                { dataKey: 'grade', label: `Mis Resultados ${formatDateAndHour(resultado.createdAt)}`, valueFormatter },
              ]}
              layout="horizontal"
              height={500}
            />
          );
        }
      })}
    </>
  );
}

function valueFormatter(value: number | null) {
  return `${value} puntos`;
}

function abbreviate(name: string) {
  return name
    .split(' ')
    .map((word) => word.slice(0, 3))
    .join(' ');
}
