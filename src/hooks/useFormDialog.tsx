import type { FormDialogProps, ModalComponentProps } from '@/components';
import { FormDialog, useModal } from '@/components';

export function useFormDialog() {
  const { showModal } = useModal();
  const showFormDialog = (props: ModalComponentProps<FormDialogProps>) => showModal(FormDialog, props);

  return { showFormDialog };
}
