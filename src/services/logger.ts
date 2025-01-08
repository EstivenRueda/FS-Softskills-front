import { LOG_LEVEL } from '@/consts';

export type LogFn = {
  (message?: any, ...optionalParams: any[]): void;
};

export type Logger = {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
};

export type LogLevel = 'log' | 'warn' | 'error';

const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {};

/**
 * Logger which outputs to the browser console
 *
 * @param options - Logger options
 * @param options.level - Log level
 * @returns Logger
 */
export class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  constructor(options?: { level?: LogLevel }) {
    const { level } = options || {};

    this.error = console.error.bind(console);

    if (level === 'error') {
      this.warn = NO_OP;
      this.log = NO_OP;
      return;
    }

    this.warn = console.warn.bind(console);

    if (level === 'warn') {
      this.log = NO_OP;
      return;
    }

    this.log = console.log.bind(console);
  }
}

export const logger = new ConsoleLogger({ level: LOG_LEVEL });

export function getClientValidationError(error: any, defaultMessage: string): string {
  if (['client_error', 'validation_error'].includes(error?.data?.type)) {
    return error?.data?.errors?.map((e: any) => e.detail).join('\n');
  }

  return defaultMessage;
}
