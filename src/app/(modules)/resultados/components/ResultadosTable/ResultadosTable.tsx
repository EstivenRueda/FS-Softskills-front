import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { EmptyStateTable } from '@/components';
import { PAGE_SIZE_OPTIONS } from '@/consts';
import { useResultadosTable } from '../../hooks';
import { ResultadosTableFilters } from './ResultadosTableFilters';

export function ResultadosTable() {
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
  } = useResultadosTable();

  return (
    <>
      <Typography variant="h3" color="text.primary" sx={{ mb: 3 }}>
        Resultados
      </Typography>
      <ResultadosTableFilters onFilterChange={handleFilterModelChange} />
      <Box height={500} width={'100%'}>
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
          slots={{ toolbar, noResultsOverlay: EmptyStateTable, noRowsOverlay: EmptyStateTable }}
          sx={{ borderRadius: 2, boxShadow: 2 }}
        />
      </Box>
    </>
  );
}
