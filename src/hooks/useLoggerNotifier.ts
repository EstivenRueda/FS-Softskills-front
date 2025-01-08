import { useCallback } from 'react';
import { type VariantType, useSnackbar } from 'notistack';
import { getClientValidationError, logger } from '@/services';

export function useLoggerNotifier() {
  const { enqueueSnackbar } = useSnackbar();

  const notify = useCallback(
    (defaultMessage: string, variant: VariantType = 'default', error?: any) => {
      let message = getClientValidationError(error, defaultMessage);
      if (variant === 'error') {
        logger.error(message);
      }
      enqueueSnackbar(message, { variant });
    },
    [enqueueSnackbar]
  );

  return { notify };
}
