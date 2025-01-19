import { Avatar, Box, IconButton } from '@mui/material'
import { useState } from 'react'
import { useLogout, useUser, useFormDialog, useLoggerNotifier } from '@/app/hooks';


export function Profile() {
  const { user, isLoading: userIsLoading } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  return (
    <Box>
       <IconButton
        size="large"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{
          ...(open && { color: 'primary.main' }),
        }}
        onClick={handleClick}
      >
        {!userIsLoading && !!user?.avatar?.path ? (
          <Avatar src={`${user.avatar.path}`} alt={`${user?.name}`} sx={{ width: 35, height: 35 }} />
        ) : (
          <Avatar src="" alt={`Profile image`} sx={{ width: 35, height: 35 }} />
        )}
      </IconButton>

    </Box>
  )
}
