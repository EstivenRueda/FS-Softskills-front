'use client';

import { AddOutlined as AddOutlinedIcon } from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PAGE_SIZE_OPTIONS } from '@/consts';
import { useHabilidadesBlandasTable } from '../../hooks';
import NextLink from 'next/link'

export function HabilidadesBlandasTable() {
  const {
    apiRef,
    results,
    handleFilterModelChange,
    handleRowSelectionModelChange,
    initialState,
    isLoading,
    paginationModel,
    rowCountState,
    rowSelectionModel,
    setPaginationModel,
    columns,
    toolbar,
  } = useHabilidadesBlandasTable();

  return (
    <>
      <Typography variant="h3" color="text.primary">
        Habilidades Blandas
      </Typography>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'flex-end',
        }}
      >
        <Button
          startIcon={<AddOutlinedIcon />}
          variant="contained"
          color="secondary"
          LinkComponent={NextLink}
          type='button'
          href='/habilidades-blandas/create'
        >
          Crear habilidad blanda
        </Button>
      </Stack>
      {/* filtros */}
      <Box height={500} width={'100%'} sx={{ marginTop: 5 }}>
        <DataGrid
          apiRef={apiRef}
          rows={results}
          columns={columns}
          onFilterModelChange={handleFilterModelChange}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          initialState={initialState}
          loading={isLoading}
          paginationModel={paginationModel}
          paginationMode="server"
          filterMode="server"
          rowCount={rowCountState}
          rowSelectionModel={rowSelectionModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          checkboxSelection={false}
          disableRowSelectionOnClick
          slots={{ toolbar }}
          sx={{ borderRadius: 2, boxShadow: 2 }}
        />
      </Box>
    </>
  );
}
