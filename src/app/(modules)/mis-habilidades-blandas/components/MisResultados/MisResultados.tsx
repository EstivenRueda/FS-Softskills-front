import { BarChart } from '@mui/x-charts';
import { useRetrieveMisResultadosQuery } from '../../services';

export function MisResultados() {
  const { data: misResultados, isLoading } = useRetrieveMisResultadosQuery();

  const abbreviate = (name: string) =>
    name
      .split(' ')
      .map((word) => word.slice(0, 3))
      .join(' ');

  const dataset =
    misResultados?.map((result) => ({
      softskill_name: result.softskill_name,
      grade: result.grade,
    })) ?? [];

  return (
    <BarChart
      dataset={dataset}
      yAxis={[
        {
          scaleType: 'band',
          dataKey: 'softskill_name',
          valueFormatter: (name, context) => (context.location === 'tick' ? abbreviate(name) : name),
        },
      ]}
      xAxis={[{ label: 'Puntaje', max: 100 }]}
      series={[{ dataKey: 'grade', label: 'Mis Resultados', valueFormatter }]}
      layout="horizontal"
      height={500}
    />
  );
}

function valueFormatter(value: number | null) {
  return `${value} puntos`;
}
