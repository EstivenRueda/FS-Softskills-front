import { useParams } from 'next/navigation';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { GridToolbarActions } from '@/components';
import { useDataGridStateQuery, useFormDialog } from '@/hooks';
import { ParamsWithSlug } from '@/types';
import { PreguntaForm } from '../components';
import { useRetrievePreguntasQuery } from '../services';
import { usePreguntasTableColumns } from './usePreguntasTableColumns';

export function usePreguntasTable() {
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
    stateKey: 'preguntas-grid-state',
    useRetrieveQuery: useRetrievePreguntasQuery,
    queryArgs: { softskillSlug: slug },
  });

  const columns = usePreguntasTableColumns();
  const { showFormDialog } = useFormDialog();

  const toolbar = () => (
    <GridToolbarActions
      actions={[{ title: 'Refrescar', icon: <RefreshIcon />, onClick: refetch, disabled: isLoading }]}
    />
  );

  const handleCreate = () => {
    const modal = showFormDialog({
      icon: AddIcon,
      title: 'Crear pregunta',
      width: 1000,
      children: <PreguntaForm onCompleted={() => modal.hide()} />,
    });
  };

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
