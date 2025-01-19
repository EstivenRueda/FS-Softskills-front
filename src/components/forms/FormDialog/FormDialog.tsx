import { ReactNode } from 'react';
import { CloseRounded as CloseRoundedIcon, PostAdd as PostAddIcon, SvgIconComponent } from '@mui/icons-material';
import type { DialogProps, SvgIconProps } from '@mui/material';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

export type FormDialogProps = DialogProps & {
  title: string;
  subtitle?: string;
  headContent?: ReactNode;
  icon?: SvgIconComponent;
  iconColor?: SvgIconProps['color'];
  width?: number;
  onClose?: () => void;
};

export function FormDialog(props: FormDialogProps) {
  const { title, subtitle, headContent, width = 600, icon, iconColor, children, onClose, sx, ...rest } = props;
  const Icon = icon;
  return (
    <Dialog
      {...rest}
      sx={{
        '& .MuiDialog-paper': {
          width,
          maxWidth: width,
        },
        ...sx,
      }}
    >
      <DialogTitle
        variant="h5"
        sx={{ display: 'flex', alignItems: 'center', padding: (theme) => theme.spacing(2, 2, 2, 3) }}
      >
        <Box component="span" flex={1}>
          <Box display="flex" alignItems="center" gap={1}>
            {Icon && <Icon color={iconColor || 'primary'} fontSize="large" />}
            <Typography color="secondary" fontWeight={600} variant="h4">
              {title}
            </Typography>
          </Box>
          {subtitle && (
            <Typography variant="h6" color={'GrayText'}>
              {subtitle}
            </Typography>
          )}
          {headContent && <>{headContent}</>}
        </Box>
        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }} dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}
