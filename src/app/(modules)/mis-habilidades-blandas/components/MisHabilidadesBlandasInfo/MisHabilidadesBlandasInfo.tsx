import Image from 'next/image';
import { ContentPaste as ContentPasteIcon } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Card, Typography, Stack } from '@mui/material';
import { useMisHabilidadesBlandasInfo } from '../../hooks';
import { MisResultados } from '../MisResultados';

export function MisHabilidadesBlandasInfo() {
  const {
    misResultados,
    isLoading,
    formUrl,
    isInitialQuestionnaireGroup,
    hasIncompleteQuestionnaire,
    handleCreateGroupQuestionnaire,
    handleCreateNewGroupQuestionnaire,
  } = useMisHabilidadesBlandasInfo();

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
        {isInitialQuestionnaireGroup && hasIncompleteQuestionnaire ? (
          <>
            <Button
              startIcon={<ContentPasteIcon />}
              variant="contained"
              color="secondary"
              size="large"
              loading={isLoading}
              onClick={() => handleCreateGroupQuestionnaire(formUrl)}
            >
              Llenar cuestionario
            </Button>
            <Image src="/images/emptyFolder.png" alt="setting" width="200" height="200" />
            <Typography fontSize={18} mt={3}>
              No tienes un cuestionario completo por el momento
            </Typography>
          </>
        ) : (
          <Button
            startIcon={<ContentPasteIcon />}
            variant="contained"
            color="secondary"
            size="large"
            loading={isLoading}
            onClick={() => handleCreateNewGroupQuestionnaire(formUrl)}
          >
            Llenar nuevo cuestionario
          </Button>
        )}
        {misResultados && !!misResultados.length && <MisResultados misResultados={misResultados} />}
      </Stack>
    </Card>
  );
}
