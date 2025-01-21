import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';
import { AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon } from '@mui/icons-material';
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';

export type MenuAction = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  color?: string | undefined;
};

export type MenuActionsProps = {
  actions: MenuAction[];
  disabled?: boolean;
};

export function MenuActions(props: MenuActionsProps) {
  const { actions, disabled } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="primary" aria-label="menu actions" onClick={handleClick} disabled={disabled}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
      <Menu
        id="menu-actions"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {actions?.map((action) => (
          <MenuItem
            key={action.label}
            onClick={() => {
              action.onClick();
              handleClose();
            }}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            <Typography color={action.color}>{action.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
