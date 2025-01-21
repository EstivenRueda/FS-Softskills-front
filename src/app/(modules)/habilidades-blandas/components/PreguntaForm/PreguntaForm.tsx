import { LoadingButton as Button } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { FormContainer, FormSection, TextField } from '@/components';
import { usePreguntaForm, UsePreguntaFormOptions } from '../../hooks';

export type PreguntaFormProps = UsePreguntaFormOptions;

export function PreguntaForm(props: PreguntaFormProps) {
  const { formContext, handleSubmit, isLoading, isViewPage } = usePreguntaForm(props);

  return (
    <Box p={3}>
      <FormContainer formContext={formContext} onSuccess={handleSubmit}>
        <FormSection>
          <TextField name="description" label="Pregunta" speech required disabled={isViewPage} />
        </FormSection>
        <Stack direction="row" spacing={4} justifyContent="right">
          <Button
            type="submit"
            loading={isLoading}
            variant="contained"
            color="secondary"
            disabled={isViewPage}
          >
            Guardar
          </Button>
        </Stack>
      </FormContainer>
    </Box>
  );
}
