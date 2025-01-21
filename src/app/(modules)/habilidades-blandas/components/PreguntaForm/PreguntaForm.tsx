import { LoadingButton as Button } from '@mui/lab';
import { FormContainer, FormSection, TextField } from '@/components';
import { usePreguntaForm, UsePreguntaFormOptions } from '../../hooks';

export type PreguntaFormProps = UsePreguntaFormOptions;

export function PreguntaForm(props: PreguntaFormProps) {
  const { formContext, handleSubmit, isLoading, isViewPage } = usePreguntaForm(props);

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmit}>
      <FormSection title="Pregunta" sx={{ p: 5 }}>
        <TextField name="description" label="Pregunta" speech required disabled={isViewPage} />
      </FormSection>
      <Button
        type="submit"
        loading={isLoading}
        variant="contained"
        color="secondary"
        sx={{ float: 'right', marginRight: 5 }}
        disabled={isViewPage}
      >
        Guardar
      </Button>
    </FormContainer>
  );
}
