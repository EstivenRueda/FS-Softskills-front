import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Box, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import { FormContainer, TextField } from '@/components';
import { useLoginForm } from '../../hooks';

export function LoginForm() {
  const {
    errorMessage,
    formContext,
    handleClickShowPassword,
    handleSubmit,
    handleForgotPasswordClick,
    isLoading,
    showPassword,
  } = useLoginForm();

  return (
    <FormContainer
      formContext={formContext}
      onSuccess={handleSubmit}
      FormProps={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" color="secondary" fontWeight={400} align="center">
        Iniciar Sesión
      </Typography>

      <Stack>
        <Box sx={{ mb: 2 }}>
          <TextField name="email" label={'Usuario'} variant="outlined" required fullWidth />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            type={showPassword ? 'text' : 'password'}
            name="password"
            label={'Contraseña'}
            variant="outlined"
            required
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" color="primary">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {errorMessage && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Link
          href="#"
          underline="hover"
          color="primary"
          sx={{
            fontSize: '0.875rem',
            '&:hover': {
              color: '#252d6f',
            },
          }}
          onClick={handleForgotPasswordClick} // Open the "Forgot Password" modal
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </Stack>

      <Button color="secondary" variant="contained" size="large" type="submit" loading={isLoading}>
        Iniciar sesión
      </Button>
    </FormContainer>
  );
}
