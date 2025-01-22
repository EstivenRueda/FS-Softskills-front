import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { GridToolbarActions } from '@/components';
import { useDataGridStateQuery, useFormDialog } from '@/hooks';
import { useRetrieveCapacitacionesQuery } from '../services';
import { useCapacitacionesTableColumns } from './useCapacitacionesTableColumns';
import { CapacitacionForm } from '../components/CapacitacionForm';

export function useCapacitacionesTable() {
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
    stateKey: 'capacitaciones-grid-state',
    useRetrieveQuery: useRetrieveCapacitacionesQuery,
  });

  const columns = useCapacitacionesTableColumns();
  const { showFormDialog } = useFormDialog();


  const handleCreate = () => {
    const modal = showFormDialog({
      icon: AddIcon,
      title: 'Crear capacitación',
      width: 1000,
      children: <CapacitacionForm onCompleted={() => modal.hide()} />,
    });
  };

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
    handleCreate,
  };
}
