import { useMemo } from 'react';
import NextLink from 'next/link';
import { Link } from '@mui/material';
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
        headerAlign: 'center',
        flex: 1,
        renderCell: (params) => (
          <Link
            component={NextLink}
            underline="hover"
            variant="body2"
            sx={{ textDecoration: 'none', color: 'primary.main' }}
            id={params.row.id}
            href={`/habilidades-blandas/${params.row.slug}/ver`}
          >
            {params.row.name}
          </Link>
        ),
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
    ],
    [getTableActions]
  );
}
