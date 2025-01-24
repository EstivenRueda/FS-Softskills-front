import NextLink from 'next/link';
import { Link } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { upperCase } from 'lodash';
import { MenuActions } from '@/components';
import { useConst, useIsViewPage } from '@/hooks';
import { formatDate } from '@/utils';
import { useFileAssetTableActions } from './useFileAssetTableActions';

export function useFileAssetTableColumns() {
  const disabled = useIsViewPage();
  const getTableActions = useFileAssetTableActions();

  return useConst<GridColDef[]>([
    {
      field: 'index',
      headerName: '#',
      type: 'number',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 50,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: 'name',
      headerName: 'Nombre del archivo',
      sortable: false,
      filterable: false,
      hideable: false,
      flex: 2,
      renderCell: (params) => (
        <Link underline="none" href={params.row.path} target="_blank" rel="noopener noreferrer" component={NextLink}>
          {params.row?.name}
        </Link>
      ),
    },
    {
      field: 'format',
      headerName: 'Formato',
      sortable: false,
      filterable: false,
      flex: 1,
      //valueFormatter: (params) => upperCase(params.value),
    },
    {
      field: 'created_at',
      headerName: 'Fecha',
      sortable: false,
      filterable: false,
      flex: 1,
      //valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: 'actions',
      headerName:'Acciones',
      sortable: false,
      filterable: false,
      hideable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <MenuActions actions={getTableActions(params.row)} disabled={disabled} />,
    },
  ]);
}
