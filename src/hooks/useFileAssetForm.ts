import { useForm } from 'react-hook-form';
import { useIsViewPage, useLoggerNotifier } from '@/hooks';
import { useCreateFileMutation, useUpdateFileMutation, useRetrieveFileCategoriesQuery } from '@/services';
import { FileAsset } from '@/types';
import { useFileAssetFormResolver } from './useFileAssetFormResolver';

export type UseFileAssetFormOptions = {
  sourceId?: string;
  contentType?: number;
  sourceCategory?: string;
  fileAsset?: FileAsset;
  onCompleted?: () => void;
  acceptedFiles?: string[];
  textFormats?: string;
  disabled?: boolean;
};

export function useFileAssetForm(options: UseFileAssetFormOptions) {
  const isViewPage = useIsViewPage();
  const { notify } = useLoggerNotifier();
  const { fileAsset, sourceId, contentType, sourceCategory = 'DOCUMENT', onCompleted } = options;
  const [createFile, { isLoading: createFileLoading }] = useCreateFileMutation();
  const [updateFile, { isLoading: updateFileLoading }] = useUpdateFileMutation();
  const { data: fileAssetCategories } = useRetrieveFileCategoriesQuery();

  const fileAssetFormResolver = useFileAssetFormResolver();

  const formContext = useForm<FileAsset>({
    resolver: fileAssetFormResolver,
    values: fileAsset,
    mode: 'onChange',
    defaultValues: {
      source_id: sourceId,
      content_type: contentType,
      category: sourceCategory, // TODO: delete when there are validations
    },
  });

  const handleSubmit = async (data: FileAsset) => {
    try {
      const [path] = (data.path || []) as File[];
      const name = path.name;
      if (fileAsset) {
        await updateFile({
          ...fileAsset,
          ...data,
          path,
          name,
        }).unwrap();
        notify("Actualizado exitosamente", 'success');
        onCompleted?.();
        return;
      }
      await createFile({
        ...data,
        path,
        name,
        source_id: sourceId,
        content_type: contentType,
        category: sourceCategory,
      }).unwrap();
      notify("Creado exitosamente", 'success');
      onCompleted?.();
    } catch (error: any) {
      if (fileAsset) {
        notify("Error al actualizar. Inténtalo de nuevo.", 'error', error);
        return;
      }
      notify("Selecciona un archivo", 'error', error);
    }
  };

  return {
    formContext,
    isLoading: createFileLoading || updateFileLoading,
    isViewPage,
    handleSubmit,
    fileAssetCategories,
    initialFiles: fileAsset?.path ? [fileAsset?.path] : [],
  };
}
