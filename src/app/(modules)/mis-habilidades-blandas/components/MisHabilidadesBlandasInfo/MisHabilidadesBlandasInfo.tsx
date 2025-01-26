import Image from 'next/image';
import { ContentPaste as ContentPasteIcon } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Card, Typography, Stack } from '@mui/material';
import { useMisHabilidadesBlandasInfo } from '../../hooks';
import { MisResultados } from '../MisResultados';

export function MisHabilidadesBlandasInfo() {
  const { isLoading, formUrl, hasFinished } = useMisHabilidadesBlandasInfo();

  return (
    <Card sx={{ p: 8 }}>
      <Stack
        direction="column"
        spacing={10}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!hasFinished ? (
          <>
            <Button
              startIcon={<ContentPasteIcon />}
              variant="contained"
              color="secondary"
              size="large"
              href={formUrl}
              loading={isLoading}
            >
              Llenar cuestionario
            </Button>
            <Image src="/images/emptyFolder.png" alt="setting" width="200" height="200" />
            <Typography fontSize={18} mt={3}>
              No tienes un cuestionario completo por el momento
            </Typography>
          </>
        ) : (
          <MisResultados />
        )}
      </Stack>
    </Card>
  );
}
