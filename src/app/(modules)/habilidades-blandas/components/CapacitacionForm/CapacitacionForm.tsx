import { LoadingButton as Button } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { FormContainer, FormSection, NumericTextField, TextareaAutosize, TextField } from '@/components';
import { useCapacitacionForm, UseCapacitacionFormOptions } from '../../hooks';

export type CapacitacionFormProps = UseCapacitacionFormOptions;

export function CapacitacionForm(props: CapacitacionFormProps) {
  const { formContext, handleSubmit, isLoading, isViewPage } = useCapacitacionForm(props);

  return (
    <Box p={3}>
      <FormContainer formContext={formContext} onSuccess={handleSubmit}>
        <FormSection columns={1} gap={3} sx={{ m: 2 }}>
          <TextField name="title" label="Título" speech required disabled={isViewPage} />
          <TextareaAutosize name="description" label="Descripción" speech required disabled={isViewPage} />
          <TextField name="link" label="Link" speech required disabled={isViewPage} />
        </FormSection>
        <FormSection columns={2} gap={3} sx={{ m: 2 }}>
          <NumericTextField name="min_grade" label="Puntaje mínimo" required disabled={isViewPage} />
          <NumericTextField name="max_grade" label="Puntaje máximo" required disabled={isViewPage} />
        </FormSection>
        <Stack direction="row" spacing={4} justifyContent="right" marginX={2} marginY={3}>
          <Button type="submit" loading={isLoading} variant="contained" color="secondary" disabled={isViewPage}>
            Guardar
          </Button>
        </Stack>
      </FormContainer>
    </Box>
  );
}
