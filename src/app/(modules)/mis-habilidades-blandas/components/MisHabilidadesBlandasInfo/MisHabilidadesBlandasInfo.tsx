import { Fragment } from 'react';
import { ContentPaste as ContentPasteIcon, ContentPasteSearch as ContentPasteSearchIcon } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Card, Typography, Stack } from '@mui/material';
import { useRetrieveMisHabilidadesBlandasQuery } from '../../services';

export function MisHabilidadesBlandasInfo() {
  const { data: misHabilidadesBlandas } = useRetrieveMisHabilidadesBlandasQuery();

  console.log('misHabilidadesBlandas', misHabilidadesBlandas);

  // Del array de habilidadBlanda hay que sacar el primer slug que encuentre que tenga has_current_questionnaire en false
  const slug = '';
  const url = `/mis-habilidades-blandas/${slug}/cuestionario`;

  return (
    <Card sx={{ paddingX: 5 }}>
      {misHabilidadesBlandas?.map((habilidadBlanda, index) => (
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
