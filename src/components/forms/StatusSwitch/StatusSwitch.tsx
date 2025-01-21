import type { ChangeEvent } from 'react';
import { CircularProgress } from '@mui/material';
import type { TypedUseMutation } from '@reduxjs/toolkit/query/react';
import { useConfirmDialog, useLoggerNotifier } from '@/hooks';
import { BaseStatusSwitch } from './BaseStatusSwitch';

export type StatusSwitchProps = {
  id: string;
  slug?: string;
  isActive: boolean;
  usePatchMutation: TypedUseMutation<any, any, any>;
  disabled?: boolean;
  onComplete?: (patchedRecord: any) => void;
};

export function StatusSwitch(props: StatusSwitchProps) {
  const { id, slug, isActive, usePatchMutation, disabled, onComplete } = props;
  const { notify } = useLoggerNotifier();
  const { showConfirmDialog } = useConfirmDialog();
  const [patch, { isLoading }] = usePatchMutation();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    showConfirmDialog({
      title: isActive ? 'Inactivación' : 'Activación',
      alert: true,
      alertMessage: isActive
        ? 'La información asociada a este registro se ocultará hasta que se active de nuevo.'
        : 'La información asociada a este registro se activará de nuevo.',
      checkbox: true,
      checkboxLabel: isActive
        ? 'Estoy seguro que quiero inactivar este registro.'
        : 'Estoy seguro que quiero activar este registro.',
      async onConfirm() {
        try {
          const patchObj = slug ? { slug, is_active: !isActive } : { id, is_active: !isActive };
          const patchedRecord = await patch(patchObj).unwrap();
          notify('Actualizado exitosamente', 'success');
          onComplete?.(patchedRecord);
        } catch (error) {
          notify('Error al actualizar el estado. Inténtalo de nuevo.', 'error', error);
        }
      },
    });
  };

  if (isLoading) return <CircularProgress />;

  return (
    <BaseStatusSwitch
      disabled={disabled}
      checked={isActive}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
