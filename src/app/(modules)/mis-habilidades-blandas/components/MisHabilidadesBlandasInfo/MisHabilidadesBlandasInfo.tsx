import { Fragment } from 'react';
import Image from 'next/image';
import { ContentPaste as ContentPasteIcon, ContentPasteSearch as ContentPasteSearchIcon } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Card, Typography, Stack } from '@mui/material';
import { useRetrieveMisHabilidadesBlandasQuery } from '../../services';

export function MisHabilidadesBlandasInfo() {
  const { data: misHabilidadesBlandas } = useRetrieveMisHabilidadesBlandasQuery();

  console.log('misHabilidadesBlandas', misHabilidadesBlandas);

  const slug = misHabilidadesBlandas?.find((hasForm)=> hasForm.has_current_questionnaire === false );
  const url = `/mis-habilidades-blandas/${slug?.slug}/cuestionario`;

  return (
    <Card sx={{ p:8 }}>
      <Stack
        direction="column"
        spacing={10}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button startIcon={<ContentPasteIcon />} variant="contained" color="secondary" size="large" href={url}>
          Llenar cuestionario
        </Button>
        <Image src="/images/emptyFolder.png" alt="setting" width="200" height="200" />
        <Typography fontSize={18} mt={3}>
          No se encontraron registros asociados
        </Typography>
      </Stack>
    </Card>
  );
}
