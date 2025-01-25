import { DeleteOutline as DeleteOutlineIcon, EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import { FileAssetForm } from '@/components';
import { useConfirmDialog, useConst, useFormDialog, useLoggerNotifier } from '@/hooks';
import { useDeleteFileMutation } from '@/services';
import type { FileAsset, TableActionsFn } from '@/types';

export function useFileAssetTableActions() {
  const { notify } = useLoggerNotifier();
  const { showConfirmDialog } = useConfirmDialog();
  const { showFormDialog } = useFormDialog();
  const [deleteFile] = useDeleteFileMutation();

  return useConst<TableActionsFn<FileAsset>>(() => (fileAsset: FileAsset) => [
    {
      label: 'Editar',
      icon: <EditOutlinedIcon color="primary" />,
      onClick() {
        const modal = showFormDialog({
          title: 'Editar archivo',
          icon: EditOutlinedIcon,
          width: 800,
          children: (
            <FileAssetForm
              fileAsset={fileAsset}
              sourceId={fileAsset.source_id}
              contentType={fileAsset.content_type}
              sourceCategory={fileAsset.category}
              onCompleted={() => modal.hide()}
            />
          ),
        });
      },
    },
    {
      label: 'Eliminar',
      icon: <DeleteOutlineIcon color="primary" />,
      onClick() {
        showConfirmDialog({
          icon: DeleteOutlineIcon,
          destructive: true,
          async onConfirm() {
            try {
              await deleteFile(fileAsset.id).unwrap();
              notify('Eliminado exitosamente', 'success');
            } catch (error) {
              notify('Error al eliminar. Inténtalo de nuevo.', 'error', error);
            }
          },
        });
      },
    },
  ]);
}
