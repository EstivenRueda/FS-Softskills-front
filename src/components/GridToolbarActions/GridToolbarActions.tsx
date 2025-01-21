import type { ReactNode } from 'react';
import { IconButton } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';

export type GridToolbarAction = {
  title: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export type GridToolbarActionsProps = {
  actions: GridToolbarAction[];
};

export function GridToolbarActions(props: GridToolbarActionsProps) {
  const { actions } = props;

  return (
    <GridToolbarContainer
      sx={{
        p: 1,
        gap: 1,
        borderBottom: 1,
        borderBottomColor: 'divider',
      }}
    >
      {actions?.map((action) => (
        <IconButton key={action.title} onClick={action.onClick} disabled={action.disabled} title={action.title}>
          {action.icon}
        </IconButton>
      ))}
    </GridToolbarContainer>
  );
}
