'use client';

import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { EmptyStateTable } from '@/components';
import { PAGE_SIZE_OPTIONS } from '@/consts';
import { useFileAssetTableActions, type UseFileAssetTableOptions } from '@/hooks';
import { useFileAssetTable } from '@/hooks/useFileAssetTable';

export type FileAssetTableProps = UseFileAssetTableOptions;

export function FileAssetTable(props: FileAssetTableProps) {
  const { results, columns, isLoading, rowCountState, paginationModel, setPaginationModel } = useFileAssetTable(props);


  return (
    <Box mb={4}>
      <Box height={500} width="100%">
        <DataGrid
          rows={results}
          columns={columns}
          rowCount={rowCountState}
          loading={isLoading}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          sx={{ borderRadius: 3, boxShadow: 3 }}
          slots={{ noResultsOverlay: EmptyStateTable, noRowsOverlay: EmptyStateTable }}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
