import { useParams } from 'next/navigation';
import { LoadingButton as Button } from '@mui/lab';
import { FormContainer, FormSection, TextField } from '@/components';
import { ParamsWithSlug } from '@/types';
import { useHabilidadBlandaInfoForm } from '../../hooks';

export function HabilidadBlandaInfoForm() {
  const { slug } = useParams<ParamsWithSlug>();
  const {formContext, handleSubmit, isLoading} = useHabilidadBlandaInfoForm(slug);

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmit}>
      <FormSection title="Habilidad blanda" sx={{ p: 5 }}>
        <TextField name="name" label="Nombre" speech required />
      </FormSection>
      <Button type="submit" loading={isLoading} variant="contained" color="secondary" sx={{float: 'right', marginRight:5}}>
        Guardar
      </Button>
    </FormContainer>
  );
}
