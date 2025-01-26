import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { MenuActions } from '@/components';
import { useResultadosTableActions } from './useResultadosTableActions';

export function useResultadosTableColumns() {
  const getTableActions = useResultadosTableActions();

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
        field: 'softskill_name',
        headerName: 'Habilidad',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'attendee_name',
        headerName: 'Participante',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'grade',
        headerName: 'Puntaje',
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        flex: 1,
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
        renderCell: (params) => <MenuActions actions={getTableActions(params.row)} />,
      },
    ],
    [getTableActions]
  );
}
