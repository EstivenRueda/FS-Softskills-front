import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton as Button } from '@mui/lab';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box } from '@mui/material';
import { FormContainer, TextField } from '@/components';
import { useResetPasswordEmailForm } from '../../hooks';

interface ResetPasswordEmailProps {
  onClose: () => void;
}

export function ResetPasswordEmailForm({ onClose }: ResetPasswordEmailProps) {
  const { formContext, handleSubmit, isLoading, errorMessage } = useResetPasswordEmailForm();

  return (
    <Dialog open={true} onClose={onClose}>
      <FormContainer
        formContext={formContext}
        onSuccess={handleSubmit}
        FormProps={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#4A4FB0', fontWeight: 600 }}>
              Restablecer contraseña
            </Typography>
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2, color: '#6B6B6B' }}>
            Ingresa tu correo electrónico para recibir un enlace de restablecimiento de contraseña.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField name="email" label={'Correo electrónico'} variant="outlined" required fullWidth />
          </Box>
          {errorMessage && (
            <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Box display="flex" justifyContent="center" mt={3}>
            <Button sx={{ mb: 4 }} color="secondary" variant="contained" size="large" type="submit" loading={isLoading}>
              Enviar enlace
            </Button>
          </Box>
        </DialogContent>
      </FormContainer>
    </Dialog>
  );
}
