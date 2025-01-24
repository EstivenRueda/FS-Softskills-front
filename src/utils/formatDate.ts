import { isDate, format, parseISO } from 'date-fns';

export const formatDate = (value: any): string => {
  if (value && typeof value === 'string' && value.includes('-')) {
    const date = parseISO(value);
    return format(date, 'dd/MM/yyyy');
  } else if (isDate(value)) {
    return format(value as Date, 'dd/MM/yyyy');
  } else {
    return value;
  }
};

export const formatDateAndHour = (value: any): string => {
  if (value && typeof value === 'string' && value.includes('-')) {
    const date = parseISO(value);
    return format(date, 'dd/MM/yyyy - HH:mm aaa');
  } else if (isDate(value)) {
    return format(value as Date, 'dd/MM/yyyy - HH:mm aaa');
  } else {
    return value;
  }
};
