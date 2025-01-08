import { useState, useEffect, type MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import {
  ExpandLessOutlined as ExpandLessOutlinedIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
} from '@mui/icons-material';
import { ListItemIcon, ListItemButton, Collapse, styled, ListItemText } from '@mui/material';
import { SidebarNavItem, type NavItem } from './SidebarNavItem';

export type SidebarNavCollapseProps = {
  menu: NavItem;
  level: number;
  pathWithoutLastPart: any;
  pathDirect: any;
  hideMenu: any;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

export function SidebarNavCollapse(props: SidebarNavCollapseProps) {
  const { menu, level, pathWithoutLastPart, pathDirect, hideMenu, onClick } = props;
  const Icon = menu?.icon;
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    menu?.children?.forEach((item: any) => {
      if (item?.href === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  const ListItemStyled = styled(ListItemButton)(({ theme }) => ({
    marginBottom: '2px',
    padding: '8px 10px',
    paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    backgroundColor: pathname.includes(menu.href) ? theme.palette.primary.main : '',
    color: pathname.includes(menu.href) ? 'white' : open ? theme.palette.primary.main : theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: pathname.includes(menu.href) ? theme.palette.primary.main : theme.palette.primary.light,
      color: pathname.includes(menu.href) ? 'white' : theme.palette.primary.main,
    },
    borderRadius: '7px',
  }));

  // If Menu has Children
  const submenus = menu.children?.map((item) => {
    if (item.children) {
      return (
        <SidebarNavCollapse
          key={item?.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    } else {
      return (
        <SidebarNavItem
          key={item.id}
          item={item}
          level={level}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    }
  });

  return (
    <>
      <ListItemStyled
        onClick={handleClick}
        color="secondary"
        selected={pathWithoutLastPart === menu.href}
        key={menu?.id}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          <Icon sx={{ marginLeft: hideMenu ? '-3px' : '' }} />
        </ListItemIcon>
        <ListItemText
          title={menu.title}
          sx={{
            '.MuiTypography-root': {
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          }}
          color="inherit"
        >
          {hideMenu ? '' : <>{menu.title}</>}
        </ListItemText>
        {!hideMenu && (!open ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />)}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {submenus}
      </Collapse>
    </>
  );
}
