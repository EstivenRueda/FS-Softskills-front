import { type MouseEvent, useEffect } from 'react';
import { KeyboardVoiceOutlined as KeyboardVoiceOutlinedIcon } from '@mui/icons-material';
import { IconButton, type IconButtonProps } from '@mui/material';
import { useSpeechRecognition } from '@/hooks';

export type VoiceInputButtonProps = IconButtonProps & {
  onTranscribe: (transcript: string) => void;
};

export function SpeechButton(props: VoiceInputButtonProps) {
  const { onTranscribe, ...rest } = props;
  const { finalTranscript, listening, resetTranscript, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript) {
      onTranscribe?.(finalTranscript);
    }
    return () => {
      resetTranscript();
    };
  }, [finalTranscript, onTranscribe, resetTranscript]);

  const handleClick = () => {
    listening ? stopListening() : startListening();
  };

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <IconButton
      aria-label="speech recognition"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      disabled={listening}
      {...rest}
    >
      <KeyboardVoiceOutlinedIcon fontSize="inherit" color={listening ? 'error' : 'inherit'} />
    </IconButton>
  );
}
