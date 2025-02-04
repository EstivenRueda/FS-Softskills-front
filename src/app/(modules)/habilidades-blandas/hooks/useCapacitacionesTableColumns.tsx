import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { MenuActions, StatusSwitch } from '@/components';
import { useIsViewPage } from '@/hooks';
import { usePatchCapacitacionMutation } from '../services';
import { useCapacitacionesTableActions } from './useCapacitacionesTableActions';

export function useCapacitacionesTableColumns(contentTypeCapacitacion: number) {
  const disabled = useIsViewPage();
  const getTableActions = useCapacitacionesTableActions(contentTypeCapacitacion);

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
        field: 'title',
        headerName: 'Título',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'description',
        headerName: 'Descripción',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'link',
        headerName: 'Link',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        flex: 1,
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
            usePatchMutation={usePatchCapacitacionMutation}
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
