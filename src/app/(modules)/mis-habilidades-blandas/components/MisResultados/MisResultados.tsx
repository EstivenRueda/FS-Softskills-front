import { BarChart } from '@mui/x-charts';
import { useRetrieveMisResultadosQuery } from '../../services';

export function MisResultados() {
  const { data: misResultados, isLoading } = useRetrieveMisResultadosQuery();

  const dataset =
    misResultados?.map((result) => ({
      softskill_name: result.softskill_name,
      grade: result.grade,
    })) ?? [];

  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'softskill_name' }]}
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
