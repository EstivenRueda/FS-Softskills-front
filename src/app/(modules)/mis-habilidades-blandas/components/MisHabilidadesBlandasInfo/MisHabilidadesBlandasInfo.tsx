import { Fragment } from 'react';
import { ContentPaste as ContentPasteIcon, ContentPasteSearch as ContentPasteSearchIcon } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Card, Typography, Stack } from '@mui/material';
import { useRetrieveHabilidadesBlandasQuery } from '@/app/(modules)/habilidades-blandas/services';

export function MisHabilidadesBlandasInfo() {
  const { data: habilidadBlanda } = useRetrieveHabilidadesBlandasQuery({ page: 0, pageSize: 25 });

  console.log('habilidadBlanda', habilidadBlanda);

  return (
    <Card sx={{ paddingX: 5 }}>
      {habilidadBlanda?.results.map((habilidadBlanda, index) => (
        <Fragment key={habilidadBlanda.id}>
          <Stack direction="row" spacing={4} justifyContent="space-between" marginX={2} marginY={3}>
            <Typography variant="h5" color="text.primary">
              {habilidadBlanda.name}
            </Typography>
            <Stack direction="row" spacing={4} marginX={2} marginY={3}>
              <Button startIcon={<ContentPasteIcon />} variant="contained" color="secondary">
                Llenar formulario
              </Button>
              <Button startIcon={<ContentPasteSearchIcon />} variant="contained" color="secondary">
                Ver resultados
              </Button>
            </Stack>
          </Stack>
        </Fragment>
      ))}
    </Card>
  );
}
