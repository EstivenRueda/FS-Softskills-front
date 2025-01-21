import { Refresh as RefreshIcon } from '@mui/icons-material';
import { GridToolbarActions } from '@/components';
import { useDataGridStateQuery } from '@/hooks';
import { useRetrieveHabilidadesBlandasQuery } from '../services';
import { useHabilidadesBlandasTableColumns } from './useHabilidadesBlandasTableColumns';

export function useHabilidadesBlandasTable() {
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
    stateKey: 'habilidades-blandas-grif-state',
    useRetrieveQuery: useRetrieveHabilidadesBlandasQuery,
  });

  const columns = useHabilidadesBlandasTableColumns();

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
