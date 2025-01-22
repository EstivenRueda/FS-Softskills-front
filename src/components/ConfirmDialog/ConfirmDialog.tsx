import React, { useState } from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import type { ButtonProps, DialogProps } from '@mui/material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Alert,
  Typography,
  Box,
} from '@mui/material';

export type ConfirmDialogProps = DialogProps & {
  title?: string;
  description?: string;
  alert?: boolean;
  checkbox?: boolean;
  alertMessage?: string;
  checkboxLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  autohide?: boolean;
  destructive?: boolean;
  cancelText?: string;
  confirmText?: string;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
  icon?: SvgIconComponent;
};

export function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    title,
    description,
    alert,
    alertMessage,
    checkbox,
    checkboxLabel,
    onCancel,
    onConfirm,
    cancelText,
    confirmText,
    cancelButtonProps,
    confirmButtonProps,
    maxWidth = 'sm',
    icon: Icon,

    ...rest
  } = props;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Dialog maxWidth={maxWidth} {...rest}>
      {title && (
        <DialogTitle
          display="flex"
          alignItems="center"
          fontSize={32}
          fontWeight={600}
          mb={-2}
          gap={1}
          ml={-1}
          color="secondary"
        >
          {Icon && <Icon color="primary" fontSize="large" />}
          {title}
        </DialogTitle>
      )}
      <Box sx={{ borderRadius: 3, boxShadow: 3, m: 2 }}>
        <DialogContent>
          {alert ? (
            <Alert variant="outlined" severity="error" sx={{ borderRadius: 2, mt: 2, mb: 4 }}>
              <Typography fontSize={14} color="error">
                {alertMessage}
              </Typography>
            </Alert>
          ) : null}
          <DialogContentText my={3} variant="subtitle2" color={'#2A3547'} fontSize={16} fontWeight={400}>
            {description}
          </DialogContentText>
          {checkbox ? (
            <FormControlLabel
              control={<Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />}
              label={checkboxLabel}
            />
          ) : null}
        </DialogContent>
        <DialogActions sx={{ mb: 2, px: 3, gap: 2 }}>
          <Button onClick={onCancel} color="primary" {...cancelButtonProps}>
            {cancelText}
          </Button>
          <Button
            disabled={checkbox ? !isChecked : false}
            onClick={onConfirm}
            variant="contained"
            color="secondary"
            sx={{ minWidth: 150 }}
            {...confirmButtonProps}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
