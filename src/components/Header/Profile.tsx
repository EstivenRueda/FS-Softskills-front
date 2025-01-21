import { useState } from 'react';
import {
  MailOutline as MailOutlineIcon,
  PowerSettingsNewTwoTone as PowerSettingsNewTwoToneIcon,
} from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Avatar, Box, Divider, IconButton, Menu, Stack, Typography } from '@mui/material';
import { useLogout, useUser } from '@/hooks';

//import { useLogout, useUser, useFormDialog, useLoggerNotifier } from '@/hooks';

export function Profile() {
  const { user, isLoading: userIsLoading } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { handleLogout, isLoading } = useLogout();

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{
          ...(open && { color: 'secondary.main' }),
        }}
        onClick={handleClick}
      >
        <Avatar src="" alt={`Profile image`} sx={{ width: 45, height: 45, bgcolor: 'secondary.main' }} />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            px: 3,
            py: 2,
            borderRadius: 3,
          },
        }}
      >
        <Typography variant="h6">Perfil de usuario</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar src="" alt={`Profile image`} sx={{ width: 80, height: 80, bgcolor: 'primary.main' }} />
          <Box>
            <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" display="flex" alignItems="center" gap={1}>
              <MailOutlineIcon width={20} height={20} />
              {user?.email}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box gap={1} display="flex" alignItems="center">
            <Button
              variant="text"
              color="primary"
              //onClick={handleOpenChangePassword} // Usa showFormDialog para abrir el modal de cambiar contraseña
            >
              Cambiar contraseña
            </Button>
            <Button
              variant="text"
              color="primary"
              endIcon={<PowerSettingsNewTwoToneIcon />}
              onClick={handleLogout}
              loading={isLoading}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
}
