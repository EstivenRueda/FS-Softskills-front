import { useState } from 'react';
import Image from 'next/image';
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { TOP_BAR_HEIGHT, TOP_BAR_WIDTH } from '../Header';
import { SidebarItems } from './SidebarItems';

export const SIDEBAR_WIDTH = 302;
export const MINI_SIDEBAR_WIDTH = 87;

export type SidebarProps = {
  isCollapse: boolean;
  isMobileSidebar: boolean;
  onToggleMobileSidebar: () => void;
};

export function Sidebar(props: SidebarProps) {
  const theme = useTheme();
  const { isCollapse, isMobileSidebar, onToggleMobileSidebar } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const [isSidebarHover, setHoverSidebar] = useState(false);
  const toggleWidth = isCollapse && !isSidebarHover ? MINI_SIDEBAR_WIDTH : SIDEBAR_WIDTH;

  const onHoverEnter = () => {
    if (isCollapse) {
      setHoverSidebar(true);
    }
  };

  const onHoverLeave = () => {
    setHoverSidebar(false);
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(isCollapse && {
            position: 'absolute',
          }),
        }}
      >
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
              backgroundColor: '#F2E5BF',
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center" p={3}>
              {(!isCollapse || isSidebarHover) && (
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={0}
                  height={0}
                  style={{ width: '100%', height: 'auto' }}
                  sizes="100vw"
                  priority
                />
              )}
            </Box>
            <SidebarItems
              isCollapse={isCollapse}
              isSidebarHover={isSidebarHover}
              onToggleMobileSidebar={onToggleMobileSidebar}
            />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebar}
      onClose={onToggleMobileSidebar}
      variant="temporary"
      PaperProps={{
        sx: {
          width: SIDEBAR_WIDTH,
          border: '0 !important',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          backgroundColor: '#F2E5BF',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" p={2} minHeight={118}>
          {!isCollapse && (
            <Image
              src="/images/logo.png"
              alt="logo"
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              sizes="100vw"
              priority
            />
          )}
        </Box>
        <SidebarItems
          isCollapse={isCollapse}
          isSidebarHover={isSidebarHover}
          onToggleMobileSidebar={onToggleMobileSidebar}
        />
      </Box>
    </Drawer>
  );
}
