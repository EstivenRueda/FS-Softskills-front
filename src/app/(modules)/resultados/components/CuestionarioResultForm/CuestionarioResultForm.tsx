import { LoadingButton as Button } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { FormContainer, FormSection, TextareaAutosize, TextField } from '@/components';
import { useCuestionarioResultForm, UseCuestionarioResultFormOptions } from '../../hooks';

export type CuestionarioResultFormProps = UseCuestionarioResultFormOptions;

export function CuestionarioResultForm(props: CuestionarioResultFormProps) {
  const { cuestionario } = props;
  const { formContext, handleSubmit, isLoading } = useCuestionarioResultForm(props);

  return (
    <Box p={3}>
      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmit}
        FormProps={{ sx: { display: 'flex', flexDirection: 'column', gap: 2 } }}
      >
        <FormSection title="Detalles" columns={2}>
          <TextField name="softskill_name" label="Habilidad blanda" disabled />
          <TextField name="grade" label="Puntaje" disabled />
        </FormSection>

        <FormSection>
          <TextareaAutosize name="observations" label="Observaciones" speech />
        </FormSection>

        <Stack direction="row" spacing={4} justifyContent="right">
          <Button type="submit" loading={isLoading} variant="contained" color="secondary">
            Guardar
          </Button>
        </Stack>
      </FormContainer>
    </Box>
  );
}
