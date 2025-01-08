import { usePathname } from 'next/navigation';
import { Box, List, useMediaQuery } from '@mui/material';
import useSidebarMenuItems from '@/hooks/useSidebarMenuItems';
import { SidebarNavCollapse } from './SidebarNavCollapse';
import { SidebarNavGroup, type NavGroup } from './SidebarNavGroup';
import { SidebarNavItem, type NavItem } from './SidebarNavItem';

export type SidebarItemsProps = {
  isCollapse: boolean;
  isSidebarHover: boolean;
  onToggleMobileSidebar: () => void;
};

export function SidebarItems(props: SidebarItemsProps) {
  const { isCollapse, isSidebarHover, onToggleMobileSidebar } = props;
  const pathname = usePathname();
  const modulePath = `/${pathname?.split('/')[1]}`;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu: any = lgUp ? isCollapse && !isSidebarHover : '';
  const menuItems = useSidebarMenuItems();

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menuItems.map((item) => {
          if (isNavGroup(item)) {
            return <SidebarNavGroup key={item.subheader} item={item} hideMenu={hideMenu} />;
          } else if (isNavItem(item)) {
            return (
              <SidebarNavCollapse
                menu={item}
                pathDirect={modulePath}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={onToggleMobileSidebar}
              />
            );
          } else {
            return (
              <SidebarNavItem
                key={(item as NavItem).id}
                item={item as NavItem}
                pathDirect={modulePath}
                hideMenu={hideMenu}
                onClick={onToggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
}

function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return !!item?.subheader;
}

function isNavItem(item: NavItem): item is NavItem {
  return !!(item as NavItem)?.children?.length;
}
