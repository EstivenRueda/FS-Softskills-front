import { LoadingButton as Button } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { Autocomplete, FormContainer, FormSection, Password, TextField } from '@/components';
import { useUsuarioForm, UseUsuarioFormOptions } from '../../hooks';

export type UsuarioFormProps = UseUsuarioFormOptions;

export function UsuarioForm(props: UsuarioFormProps) {
  const { usuario } = props;
  const { formContext, handleSubmit, isLoading, profileTypes } = useUsuarioForm(props);

  return (
    <Box p={3}>
      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmit}
        FormProps={{ sx: { display: 'flex', flexDirection: 'column', gap: 2 } }}
      >
        <FormSection columns={2}>
          <TextField name="first_name" label="Nombres" speech required />
          <TextField name="last_name" label="Apellidos" speech required />
          <TextField name="email" label="Email" speech required />
          <Autocomplete
            placeholder={'Seleccione el tipo de usuario'}
            name="profile.type"
            label={'Tipo de usuario'}
            options={profileTypes}
            valueKey="value"
            labelKey="display_name"
            matchId
            required
          />
          {!!!usuario && (
            <>
              <Password name="password" label="Contraseña" required />
              <Password name="password_confirm" label="Confirmar contraseña" required />
            </>
          )}
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
