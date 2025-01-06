import { List, ListItemButton, ListItemIcon, ListItemText, styled, Theme } from "@mui/material";
import Link from "next/link";
import { MouseEvent } from "react";

export type NavItem = {
  [x: string]: any;
  id?: string;
  label?: boolean;
  subheader?: string;
  title: string;
  icon?: any;
  href?: any;
  onClick?: MouseEvent<HTMLButtonElement, MouseEvent>;
  children?: NavItem[];
};

export type SidebarNavItemProps = {
  item: NavItem;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
};

export function SidebarNavItem(props: SidebarNavItemProps) {
  const { item, level, pathDirect, hideMenu, onClick } = props;
  const Icon = item.icon;

  const ListItemStyled = styled((props: Theme | any) => (
    <ListItemButton {...props} />
  ))(({ theme }) => ({
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "8px 10px",
    borderRadius: `7px`,
    backgroundColor: level > 1 ? "transparent !important" : "inherit",
    color:
      level > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.main} !important`
        : theme.palette.text.secondary,
    paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    "&.Mui-selected": {
      color: "white",
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <ListItemStyled
        component={Link}
        href={item.href}
        disabled={item?.disabled}
        selected={pathDirect === item?.href}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color: (theme) =>
              level > 1 && pathDirect === item?.href
                ? `${theme.palette.primary.main} !important`
                : "inherit",
          }}
        >
          <ListItemText>
            hola
          </ListItemText>
        </ListItemIcon>
      </ListItemStyled>
    </List>
  );
}