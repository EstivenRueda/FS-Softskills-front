import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { EmptyStateTable } from '@/components';
import { PAGE_SIZE_OPTIONS } from '@/consts';
import { usePreguntasTable } from '../../hooks';
import { PreguntasTableFilters } from './PreguntasTableFilters';

export function PreguntasTable() {
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
    handleCreate,
  } = usePreguntasTable();

  return (
    <>
      <Typography variant="h4" color="text.primary" sx={{ mb: 2 }}>
        Preguntas
      </Typography>
      <PreguntasTableFilters handleCreate={handleCreate} onFilterChange={handleFilterModelChange} />
      <Box height={300} width={'100%'}>
        <DataGrid
          apiRef={apiRef}
          rows={results}
          columns={columns}
          onFilterModelChange={handleFilterModelChange}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          initialState={initialState}
          loading={isLoading}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          filterMode="server"
          rowCount={rowCountState}
          rowSelectionModel={rowSelectionModel}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          checkboxSelection={false}
          disableRowSelectionOnClick
          slots={{ toolbar, noResultsOverlay: EmptyStateTable, noRowsOverlay: EmptyStateTable }}
          sx={{ borderRadius: 2, boxShadow: 2 }}
        />
      </Box>
    </>
  );
}
