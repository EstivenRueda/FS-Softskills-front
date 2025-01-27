import type { ReactNode } from 'react';
import type { Control, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import { FileUploadOutlined as FileUploadOutlinedIcon } from '@mui/icons-material';
import type { FormControlProps, StackProps } from '@mui/material';
import { Button, FormControl, FormHelperText, FormLabel, Stack, styled } from '@mui/material';
import { BASIC_ACCEPTED_FILES, MAX_FILE_SIZE } from '@/consts';
import { useFormError } from '../FormErrorProvider';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export type DropzoneAreaProps<T extends FieldValues> = {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
  rules?: ControllerProps<T>['rules'];
  parseError?: (error: FieldError) => ReactNode;
  required?: boolean;
  formControlProps?: FormControlProps;
  stackProps?: StackProps;
  helperText?: string;
  filesLimit?: number;
  acceptedFiles?: string[];
};
export function DropzoneArea<TFieldValues extends FieldValues>(props: DropzoneAreaProps<TFieldValues>) {
  const {
    name,
    control,
    label,
    rules = {},
    parseError,
    required,
    formControlProps,
    stackProps,
    helperText,
    filesLimit = 1,
    acceptedFiles = BASIC_ACCEPTED_FILES,
  } = props;
  const { setError, clearErrors } = useFormContext();
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  if (required && !rules.required) {
    rules.required = 'Este campo es obligatorio';
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { invalid, error } }) => {
        const parsedHelperText = error
          ? typeof customErrorFn === 'function'
            ? customErrorFn(error)
            : error.message
          : helperText;

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (!files) return;

          // Check for file limit
          if (files && filesLimit && files.length > filesLimit) {
            setError(name, {
              type: 'manual',
              message: `El límite de archivos es ${filesLimit}`,
            });
            return;
          }

          // Validate file type
          const invalidFile = Array.from(files).find((file) => !acceptedFiles.includes(file.type));
          if (invalidFile) {
            setError(name, {
              type: 'manual',
              message: `El archivo "${invalidFile.name}" no es un tipo de archivo aceptado.`,
            });
            return;
          }

          // Check for file size
          const oversizedFile = Array.from(files).find((file) => file.size > MAX_FILE_SIZE.value);
          if (oversizedFile) {
            setError(name, {
              type: 'manual',
              message: `El archivo "${oversizedFile.name}" supera el tamaño máximo permitido de ${MAX_FILE_SIZE.label}.`,
            });
            return;
          }

          // Clear errors and update the field value
          clearErrors(name);
          onChange(files);
        };

        return (
          <Stack width="100%" {...stackProps}>
            {label && (
              <FormLabel component="legend" error={invalid}>
                {label}
              </FormLabel>
            )}
            <FormControl error={invalid} required={required} fullWidth {...formControlProps}>
              <Button color="secondary" component="label" variant="contained" startIcon={<FileUploadOutlinedIcon />}>
                Subir archivo
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  multiple={filesLimit !== 1}
                  accept={acceptedFiles.join(',')}
                />
              </Button>
              {value && (value as any) instanceof FileList && value.length > 0 && (
                <Stack spacing={1} mt={1}>
                  {Array.from(value).map((file: any, index) => (
                    <span key={file.name}>{file.name}</span>
                  ))}
                </Stack>
              )}
              {parsedHelperText && (
                <>
                  <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>
                </>
              )}
            </FormControl>
          </Stack>
        );
      }}
    />
  );
}
