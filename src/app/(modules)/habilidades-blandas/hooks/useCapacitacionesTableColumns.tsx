import { useMemo } from 'react';
import NextLink from 'next/link';
import { Link } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { MenuActions, StatusSwitch } from '@/components';
import { usePatchHabilidadBlandaMutation } from '../services';
import { useCapacitacionesTableActions } from './useCapacitacionesTableActions';

export function useCapacitacionesTableColumns() {
  const getTableActions = useCapacitacionesTableActions();


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
        flex: 1,
        renderCell: (params) => (
          <StatusSwitch
            id={params.row.id}
            slug={params.row.slug}
            isActive={params.row.is_active}
            usePatchMutation={usePatchHabilidadBlandaMutation}
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
        renderCell: (params) => <MenuActions actions={getTableActions(params.row)} />,
      },

    ],[getTableActions]
  )
}
