import { FormContainer, FormSection, TextField } from '@/components';

export function HabilidadBlandaInfoForm() {
  return (
    <FormContainer>
      <FormSection title='Habilidad blanda' sx={{p:5}}>
        <TextField name="name" label="Nombre" speech required />
      </FormSection>
    </FormContainer>
  );
}
