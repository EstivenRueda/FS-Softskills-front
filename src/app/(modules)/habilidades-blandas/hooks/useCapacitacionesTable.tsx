import { useParams } from 'next/navigation';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { GridToolbarActions } from '@/components';
import { useDataGridStateQuery, useFormDialog } from '@/hooks';
import { ParamsWithSlug } from '@/types';
import { CapacitacionForm } from '../components/CapacitacionForm';
import { useRetrieveCapacitacionesQuery } from '../services';
import { useCapacitacionesTableColumns } from './useCapacitacionesTableColumns';

export function useCapacitacionesTable() {
  const { slug } = useParams<ParamsWithSlug>();
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
    queryArgs: { softskillSlug: slug },
  });

  const contentTypeCapacitacion = data?.content_type;
  const columns = useCapacitacionesTableColumns(contentTypeCapacitacion);
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
