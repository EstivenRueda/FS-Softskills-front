import { type MouseEvent, useState } from 'react';
import { ContentCopyOutlined as ContentCopyOutlinedIcon } from '@mui/icons-material';
import { IconButton, type IconButtonProps, Tooltip } from '@mui/material';
import { useLoggerNotifier } from '@/hooks';

export type CopyButtonProps = IconButtonProps & {
  text?: string;
  iconSize?: 'inherit' | 'small' | 'medium' | 'large';
};

export function CopyButton(props: CopyButtonProps) {
  const { text, iconSize = 'inherit', ...rest } = props;
  const { notify } = useLoggerNotifier();
  const [messageTooltip, setMessageTooltip] = useState('Copiar');

  const handleClickCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setMessageTooltip('¡Copiado!');
    } catch (error) {
      notify('No se pudo copiar: ', 'error', error);
    }
  };

  const handleCloseTooltip = () => {
    setMessageTooltip('Copiar');
  };

  const handleMouseDownCopy = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tooltip title={messageTooltip} onClose={handleCloseTooltip}>
      <IconButton aria-label="copy button" onClick={handleClickCopy} onMouseDown={handleMouseDownCopy} {...rest}>
        <ContentCopyOutlinedIcon fontSize={iconSize} />
      </IconButton>
    </Tooltip>
  );
}
