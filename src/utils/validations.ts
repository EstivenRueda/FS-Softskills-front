export const validateAlphanumericSpace = (value: string) => /^[a-zA-Z0-9\s]*$/.test(value);

export const validateAlphabetic = (value: string) => /^[^0-9]*$/.test(value);

export const validateSpecialCharactersAndNumber = (value: string) => /^[0-9()+\- ]+$/.test(value);

export const validateNumeric = (value: string) => /^[0-9]+$/.test(value);

export const validateTimeFormat = (value: string | null) => {
  if (value === null) {
    return true;
  }
  return /^(?:[0-9]{2}):(?:[0-5][0-9])$/.test(value);
};

export const validateFileRequired = (file: File | File[]) => {
  const _file = Array.isArray(file) ? file?.[0] : file;
  return !!_file;
};
