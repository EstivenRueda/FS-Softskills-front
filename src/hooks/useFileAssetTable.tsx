import { BackupOutlined as BackupOutlinedIcon } from '@mui/icons-material';
import { FileAssetForm } from '@/components';
import { useDataGridStateQuery, useFormDialog, useIsViewPage, type UseFileAssetFormOptions } from '@/hooks';
import { useRetrieveFilesQuery } from '@/services';
import { useFileAssetTableColumns } from './useFileAssetTableColumns';

export type UseFileAssetTableOptions = UseFileAssetFormOptions;

export function useFileAssetTable(options: UseFileAssetTableOptions) {
  const { showFormDialog } = useFormDialog();

  const { data, isLoading, rowCountState, paginationModel, setPaginationModel } = useDataGridStateQuery({
    stateKey: 'file-asset-data-grid-state',
    useRetrieveQuery: useRetrieveFilesQuery,
    queryArgs: { sourceId: options.sourceId },
  });

  const columns = useFileAssetTableColumns();
  const isViewPage = useIsViewPage();

  const handleOpenForm = () => {
    const modal = showFormDialog({
      title: 'Adjuntar archivos',
      icon: BackupOutlinedIcon,
      width: 800,
      children: <FileAssetForm {...options} onCompleted={() => modal.hide()} />,
    });
  };

  return {
    results: data?.results || [],
    columns,
    isViewPage,
    isLoading,
    rowCountState,
    paginationModel,
    setPaginationModel,
    handleOpenForm,
  };
}
