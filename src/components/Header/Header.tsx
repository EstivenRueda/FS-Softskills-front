import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, IconButton, Stack, Toolbar, styled, useMediaQuery } from '@mui/material';
import { Profile } from './Profile';

export const TOP_BAR_HEIGHT = 45;
export const TOP_BAR_WIDTH = 180;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  [theme.breakpoints.up('lg')]: {
    minHeight: TOP_BAR_HEIGHT,
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary,
}));

export type HeaderProps = {
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
};

export function Header(props: HeaderProps) {
  const { onToggleSidebar, onToggleMobileSidebar } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const handleToggleSidebar = () => {
    if (lgUp) {
      onToggleSidebar();
    } else {
      onToggleMobileSidebar();
    }
  };

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton color="inherit" aria-label="menu" onClick={handleToggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
}
