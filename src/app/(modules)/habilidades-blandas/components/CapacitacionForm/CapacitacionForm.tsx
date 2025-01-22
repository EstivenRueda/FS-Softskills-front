import { useParams } from 'next/navigation';
import { LoadingButton as Button } from '@mui/lab';
import { FormContainer, FormSection, TextField } from '@/components';
import { ParamsWithSlug } from '@/types';
import { useCapacitacionForm } from '../../hooks';

export function CapacitacionForm() {
  const { slug } = useParams<ParamsWithSlug>();
  const { formContext, handleSubmit, isLoading, isViewPage } = useCapacitacionForm(slug);

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmit}>
      <FormSection title="Capacitacion" sx={{ p: 5 }}>
        <TextField name="name" label="Nombre" speech required disabled={isViewPage} />
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
