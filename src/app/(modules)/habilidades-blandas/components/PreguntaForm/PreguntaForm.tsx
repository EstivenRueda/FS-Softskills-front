import { Fragment } from 'react';
import { LoadingButton as Button } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { FormContainer, FormSection, NumericTextField, TextareaAutosize } from '@/components';
import { usePreguntaForm, UsePreguntaFormOptions } from '../../hooks';

export type PreguntaFormProps = UsePreguntaFormOptions;

export function PreguntaForm(props: PreguntaFormProps) {
  const { formContext, handleSubmit, isLoading, isViewPage, likertOptions, fields } = usePreguntaForm(props);

  return (
    <Box p={3}>
      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmit}
        FormProps={{ sx: { display: 'flex', flexDirection: 'column', gap: 2 } }}
      >
        <FormSection columns={2}>
          <TextareaAutosize name="description" label="Pregunta" speech required disabled={isViewPage} />
          <NumericTextField name="order" label="Orden" required disabled={isViewPage} />
        </FormSection>

        <FormSection title="Opciones" columns={2}>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <Box display={'flex'} alignItems={'center'}>
                <Typography variant="h6">{field.display_name}</Typography>
              </Box>
              <NumericTextField name={`options[${index}].grade`} label="Puntaje" required disabled={isViewPage} />
            </Fragment>
          ))}
        </FormSection>

        <Stack direction="row" spacing={4} justifyContent="right">
          <Button type="submit" loading={isLoading} variant="contained" color="secondary" disabled={isViewPage}>
            Guardar
          </Button>
        </Stack>
      </FormContainer>
    </Box>
  );
}
