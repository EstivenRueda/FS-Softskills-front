import { useMemo } from 'react';
import Image from 'next/image';
import { Stack, Typography } from '@mui/material';
import { useRetrieveMisResultadosQuery } from '@/app/(modules)/mis-habilidades-blandas/services';
import { BasicTabs } from '@/components';
import { CapacitacionesContent } from '../CapacitacionesContent';

export function CapacitacionesTabs() {
  const { data: misResultados, isLoading: misResultadosLoading } = useRetrieveMisResultadosQuery();

  const tabs = useMemo(() => {
    if (!misResultados || !misResultados.length) {
      return [];
    }

    const grupoCuestionarioConsolidado = misResultados.find((resultado) => resultado.is_complete);

    if (!grupoCuestionarioConsolidado) {
      return [];
    }

    return grupoCuestionarioConsolidado.questionnaires.map((resultado) => ({
      label: resultado.softskill_name,
      component: <CapacitacionesContent slug={resultado.softskill_slug} />,
    }));
  }, [misResultados, misResultadosLoading]);

  return (
    <>
      <Typography variant="h3" color="text.primary" sx={{ mb: 3 }}>
        Mis Capacitaciones
      </Typography>

      {!misResultados?.length ? (
        <Stack
          direction="column"
          spacing={10}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            p: 10,
          }}
        >
          <Image src="/images/emptyFolder.png" alt="setting" width="200" height="200" />
          <Typography fontSize={18} mt={3}>
            No tienes un cuestionario completo por el momento
          </Typography>
        </Stack>
      ) : (
        <BasicTabs tabPanelSxProps={{ p: 0 }} tabs={tabs} variant="scrollable" scrollButtons="auto" />
      )}
    </>
  );
}
