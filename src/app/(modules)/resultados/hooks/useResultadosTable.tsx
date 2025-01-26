import { Refresh as RefreshIcon } from '@mui/icons-material';
import { GridToolbarActions } from '@/components';
import { useDataGridStateQuery } from '@/hooks';
import { useRetrieveCuestionariosQuery } from '../../mis-habilidades-blandas/services';
import { useResultadosTableColumns } from './useResultadosTableColumns';

export function useResultadosTable() {
  const {
    apiRef,
    data,
    handleFilterModelChange,
    handleRowSelectionModelChange,
    initialState,
    isLoading,
    paginationModel,
    refetch,
    rowCountState,
    rowSelectionModel,
    setPaginationModel,
    setRowSelectionModel,
  } = useDataGridStateQuery({
    stateKey: 'resultados-grid-state',
    useRetrieveQuery: useRetrieveCuestionariosQuery,
  });

  const columns = useResultadosTableColumns();

  const toolbar = () => (
    <GridToolbarActions
      actions={[{ title: 'Refrescar', icon: <RefreshIcon />, onClick: refetch, disabled: isLoading }]}
    />
  );

  return {
    apiRef,
    results: data?.results || [],
    handleFilterModelChange,
    handleRowSelectionModelChange,
    initialState,
    isLoading,
    paginationModel,
    refetch,
    rowCountState,
    rowSelectionModel,
    setPaginationModel,
    setRowSelectionModel,
    columns,
    toolbar,
  };
}
