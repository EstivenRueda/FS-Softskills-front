import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { MenuActions, StatusSwitch } from '@/components';
import { usePatchHabilidadBlandaMutation } from '../services';
import { useHabilidadesBlandasTableActions } from './useHabilidadesBlandasTableActions';

export function useHabilidadesBlandasTableColumns() {
  const getTableActions = useHabilidadesBlandasTableActions();

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
        field: 'name',
        headerName: 'Habilidad',
        sortable: false,
        filterable: false,
        flex: 1,
      },
      {
        field: 'is_active',
        headerName: 'estado',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        hideable: false,
        flex: 1,
        renderCell: (params) => (
          <StatusSwitch
            id={params.row.id}
            isActive={params.row.is_active}
            usePatchMutation={usePatchHabilidadBlandaMutation}
          />
        ),
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        sortable: false,
        filterable: false,
        flex: 1,
        hideable: false,
        renderCell: (params) => <MenuActions actions={getTableActions(params.row)} />,
      },
    ],
    [getTableActions]
  );
}
