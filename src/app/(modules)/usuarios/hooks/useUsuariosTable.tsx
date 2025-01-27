import { useParams } from 'next/navigation';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { GridToolbarActions } from '@/components';
import { useDataGridStateQuery, useFormDialog } from '@/hooks';
import { ParamsWithSlug } from '@/types';
import { UsuarioForm } from '../components';
import { useRetrieveUsuariosQuery } from '../services';
import { useUsuariosTableColumns } from './useUsuariosTableColumns';

export function useUsuariosTable() {
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
    stateKey: 'usuarios-grid-state',
    useRetrieveQuery: useRetrieveUsuariosQuery,
    queryArgs: { softskillSlug: slug },
  });

  const columns = useUsuariosTableColumns();
  const { showFormDialog } = useFormDialog();

  const handleCreate = () => {
    const modal = showFormDialog({
      icon: AddIcon,
      title: 'Crear usuario',
      width: 1000,
      children: <UsuarioForm onCompleted={() => modal.hide()} />,
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
