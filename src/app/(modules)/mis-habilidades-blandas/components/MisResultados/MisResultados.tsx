import { ContentPaste as ContentPasteIcon } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { BarChart } from '@mui/x-charts';
import { useRetrieveMisResultadosQuery } from '../../services';

export type MisResultadosProps = {
  handleCreate: () => void;
};

export function MisResultados(props: MisResultadosProps) {
  const { handleCreate } = props;
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
    <>
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
      <Button
        startIcon={<ContentPasteIcon />}
        variant="contained"
        color="secondary"
        size="large"
        loading={isLoading}
        onClick={handleCreate}
      >
        Llenar nuevo cuestionario
      </Button>
    </>
  );
}

function valueFormatter(value: number | null) {
  return `${value} puntos`;
}
