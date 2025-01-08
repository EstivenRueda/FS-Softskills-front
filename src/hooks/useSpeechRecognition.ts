import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition as useSpeechRecognitionBase } from 'react-speech-recognition';

export function useSpeechRecognition() {
  const { finalTranscript, listening, resetTranscript } = useSpeechRecognitionBase();
  const startListening = () => SpeechRecognition.startListening({ language: 'es-ES' });
  const stopListening = () => SpeechRecognition.stopListening();
  return { listening, finalTranscript, resetTranscript, startListening, stopListening };
}
