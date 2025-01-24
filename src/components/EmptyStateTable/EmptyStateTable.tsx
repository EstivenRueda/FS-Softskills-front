import { type ReactNode } from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export type EmptyStateTableProps = {
  title?: string;
  text?: string;
  button?: ReactNode;
};

export function EmptyStateTable(props: EmptyStateTableProps) {
  const { title, text, button } = props;

  return (
    <Grid height="100%" container display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Image src="/images/backgrounds/emptyState.svg" alt="setting" width="100" height="100" />
      <Typography fontSize={18} mt={3}>
        {title ?? 'No se encontraron registros asociados'}
      </Typography>
      <Typography fontSize={14} mt={1}>
        {text}
      </Typography>
      {button}
    </Grid>
  );
}
