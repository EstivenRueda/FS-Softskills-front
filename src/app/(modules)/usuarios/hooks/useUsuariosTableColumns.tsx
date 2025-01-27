import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { MenuActions, StatusSwitch } from '@/components';
import { useIsViewPage } from '@/hooks';
import { usePatchUsuarioMutation } from '../services';
import { useUsuariosTableActions } from './useUsuariosTableActions';

export function useUsuariosTableColumns() {
  const disabled = useIsViewPage();
  const getTableActions = useUsuariosTableActions();

  return useMemo<GridColDef[]>(
    () => [
      {
        field: 'index',
        headerName: '#',
        sortable: false,
        type: 'number',
        filterable: false,
        width: 40,
        headerAlign: 'center',
        align: 'center',
        disableColumnMenu: true,
        renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        filterable: false,
        hideable: false,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'name',
        headerName: 'Nombre',
        sortable: false,
        filterable: false,
        hideable: false,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'profile.type_name',
        headerName: 'Tipo',
        sortable: false,
        filterable: false,
        hideable: false,
        headerAlign: 'center',
        width: 150,
        valueGetter: (value, row, column, apiRef) => row.profile.type_name,
      },
      {
        field: 'is_active',
        headerName: 'Estado',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        hideable: false,
        width: 120,
        renderCell: (params) => (
          <StatusSwitch
            id={params.row.id}
            isActive={params.row.is_active}
            usePatchMutation={usePatchUsuarioMutation}
            disabled={disabled}
          />
        ),
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        width: 120,
        hideable: false,
        renderCell: (params) => <MenuActions actions={getTableActions(params.row)} disabled={disabled} />,
      },
    ],
    [getTableActions]
  );
}
