import { useMemo } from 'react';
import { VisibilityOutlined as VisibilityOutlinedIcon } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { MenuActions, PopoverButton, StatusSwitch } from '@/components';
import { useIsViewPage } from '@/hooks';
import { usePatchPreguntaMutation } from '../services';
import { Opcion } from '../types';
import { usePreguntasTableActions } from './usePreguntasTableActions';

export function usePreguntasTableColumns() {
  const disabled = useIsViewPage();
  const getTableActions = usePreguntasTableActions();

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
        field: 'order',
        headerName: 'Orden',
        sortable: false,
        filterable: false,
        hideable: false,
        headerAlign: 'center',
        align: 'center',
        width: 80,
      },
      {
        field: 'description',
        headerName: 'Pregunta',
        sortable: false,
        filterable: false,
        hideable: false,
        headerAlign: 'center',
        flex: 1,
        renderCell: (params) => (
          <PopoverButton
            id={params.row.id}
            variant={'text'}
            buttonText={params.row.description}
            title={'Pregunta'}
            icon={<VisibilityOutlinedIcon color={'primary'} style={{ fontSize: 30 }} />}
            sx={{ maxWidth: 800 }}
            content={
              <>
                <Typography fontSize={18}>{params.row.description}</Typography>
                <Divider sx={{ my: 2 }} />
                {params.row.options.map((option: Opcion) => (
                  <Typography key={option.id} variant="body2">
                    {option.display_name}: {option.grade}
                  </Typography>
                ))}
              </>
            }
          />
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
            usePatchMutation={usePatchPreguntaMutation}
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
