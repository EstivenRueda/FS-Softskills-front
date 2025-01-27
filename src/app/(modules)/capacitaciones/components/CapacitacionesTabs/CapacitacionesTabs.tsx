import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { useRetrieveMisResultadosQuery } from '@/app/(modules)/mis-habilidades-blandas/services';
import { BasicTabs } from '@/components';
import { CapacitacionesContent } from '../CapacitacionesContent';

export function CapacitacionesTabs() {
  const { data: misResultados, isLoading: misResultadosLoading } = useRetrieveMisResultadosQuery();

  const tabs = useMemo(() => {
    if (!!!misResultados) {
      return [];
    }

    return misResultados.map((resultado) => ({
      label: resultado.softskill_name,
      component: <CapacitacionesContent slug={resultado.softskill_slug} />,
    }));
  }, [misResultados, misResultadosLoading]);

  return (
    <>
      <Typography variant="h3" color="text.primary" sx={{ mb: 3 }}>
        Mis Capacitaciones
      </Typography>
      <BasicTabs tabPanelSxProps={{ p: 0 }} tabs={tabs} variant="scrollable" scrollButtons="auto" />
    </>
  );
}
