import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Box, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import { FormContainer, TextField } from '@/components';
import { useLoginForm } from '../../hooks';
import Image from 'next/image';

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
    <>
    <FormContainer
      formContext={formContext}
      onSuccess={handleSubmit}
      FormProps={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}

    >
      <Box display="flex" alignItems="center" justifyContent="center" p={3}>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          sizes="100vw"
          priority
        />
      </Box>
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
    </>
  );
}
