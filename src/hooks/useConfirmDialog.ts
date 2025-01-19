import {
  UnpublishedOutlined as UnpublishedOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material';
import type { ConfirmDialogProps, ModalComponentProps } from '@/components';
import { ConfirmDialog, useModal } from '@/components';

export function useConfirmDialog() {
  const { showModal } = useModal();

  const showConfirmDialog = (props: ModalComponentProps<ConfirmDialogProps>) => {
    const {
      title = '¿Estás seguro?',
      autohide = true,
      destructive = false,
      onCancel: handleOnCancel,
      onConfirm: handleOnConfirm,
      icon: icon,
      ...rest
    } = props;

    const modal = showModal(ConfirmDialog, {
      icon: icon ? icon : destructive ? DeleteOutlineIcon : UnpublishedOutlinedIcon,
      alert: true,
      checkbox: true,
      title: destructive ? 'Eliminación' : title,
      description: destructive ? 'La información se borrará de la base de datos y no podrás recuperarla' : undefined,
      checkboxLabel: destructive ? 'Estoy seguro que quiero eliminar este registro' : undefined,
      alertMessage: destructive ? 'Verifica los datos que estás eliminando' : undefined,
      onCancel() {
        handleOnCancel?.();
        modal.hide();
      },
      onConfirm() {
        handleOnConfirm?.();
        autohide && modal.hide();
      },
      cancelText: 'Cancelar',
      confirmText: destructive ? 'Eliminar' : 'Confirmar',
      cancelButtonProps: destructive ? { color: 'error' } : undefined,
      confirmButtonProps: destructive ? { color: 'error' } : undefined,
      ...rest,
    });

    return modal;
  };

  return { showConfirmDialog };
}
