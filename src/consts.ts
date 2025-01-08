import type { LogLevel } from '@/services';
import { Environment } from '@/types';

export const APP_ENV: Environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export const LOG_LEVEL: LogLevel = APP_ENV === 'production' ? 'warn' : 'log';

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

export const SINGLE_PAGE_SIZE_OPTIONS = [10];

export const BASIC_ACCEPTED_FILES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

export const ACCEPTED_IMAGES = ['image/png', 'image/jpeg'];

export const ACCEPTED_FILES_WITH_IMAGES = [...BASIC_ACCEPTED_FILES, ...ACCEPTED_IMAGES];

export const MAX_FILE_SIZE = {
  value: 4000000,
  label: '4MB',
};
