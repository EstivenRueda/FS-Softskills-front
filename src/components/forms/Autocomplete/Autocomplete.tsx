import type { ReactNode } from 'react';
import type { Control, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import type { AutocompleteProps as BaseAutocompleteProps, TextFieldProps } from '@mui/material';
import {
  Autocomplete as BaseAutocomplete,
  Box,
  Checkbox,
  CircularProgress,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { concat } from 'lodash';
import type { SelectOption } from '@/types';
import { useFormError } from '../FormErrorProvider';
import { mapOptionKeys } from './mapOptionKeys';
import { useServerMode, type UseServerModeOptions } from './useServerMode';

export type AutocompleteProps<
  F extends FieldValues,
  T,
  M extends boolean | undefined,
  D extends boolean | undefined,
> = {
  name: Path<F>;
  control?: Control<F>;
  options?: T[];
  valueKey?: string;
  labelKey?: string | string[];
  labelSeparator?: string;
  loading?: boolean;
  multiple?: M;
  freeSolo?: boolean;
  matchId?: boolean;
  loadingIndicator?: ReactNode;
  rules?: ControllerProps<F>['rules'];
  parseError?: (error: FieldError) => ReactNode;
  required?: boolean;
  disabled?: boolean;
  disableClearable?: boolean;
  label?: TextFieldProps['label'];
  hideOnEmpty?: boolean;
  placeholder?: string;
  showCheckbox?: boolean;
  helpIconTooltip?: string;
  autocompleteProps?: Omit<BaseAutocompleteProps<T, M, D, any>, 'name' | 'options' | 'loading' | 'renderInput'>;
  textFieldProps?: Omit<TextFieldProps, 'name' | 'required' | 'label'>;
  serverModeOptions?: Omit<UseServerModeOptions, 'labelKey' | 'labelSeparator'>;
};

export function Autocomplete<TFieldValues extends FieldValues>(
  props: AutocompleteProps<TFieldValues, SelectOption | string | any, boolean | undefined, boolean | undefined>
) {
  const {
    textFieldProps,
    name,
    control,
    options: plainOptions = [],
    valueKey = 'id',
    labelKey = 'label',
    labelSeparator = ' - ',
    loading,
    showCheckbox,
    rules,
    loadingIndicator,
    required,
    multiple,
    matchId,
    label,
    hideOnEmpty,
    placeholder,
    disabled,
    disableClearable,
    parseError,
    helpIconTooltip,
    serverModeOptions = {},
    freeSolo = false,
  } = props;
  let { autocompleteProps = {} } = props;

  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  const validationRules: ControllerProps<TFieldValues>['rules'] = {
    ...rules,
    ...(required && {
      required: rules?.required || 'Este campo es obligatorio',
    }),
  };

  const { serverOptions, serverLoading, serverProps } = useServerMode({
    ...serverModeOptions,
    labelKey,
    labelSeparator,
  } as UseServerModeOptions);
  const options = mapOptionKeys(concat(plainOptions, serverOptions), valueKey, labelKey, labelSeparator);
  const isLoading = loading || serverLoading;
  const loadingElement = loadingIndicator || <CircularProgress color="inherit" size={20} />;

  if (hideOnEmpty && options.length === 0) {
    return null;
  }
  return (
    <Controller
      name={name}
      disabled={disabled}
      control={control}
      rules={validationRules}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        let currentValue = multiple ? value || [] : value ?? null;
        if (matchId) {
          currentValue = multiple
            ? (value || []).map((i: any) => options.find((j) => (j.id ?? j) === i))
            : options.find((i) => (i.id ?? i) === value) ?? null;
        }
        return (
          <BaseAutocomplete
            readOnly={disabled}
            {...autocompleteProps}
            {...serverProps}
            disableClearable={disableClearable}
            value={currentValue}
            loading={isLoading}
            freeSolo={freeSolo}
            multiple={multiple}
            options={options}
            size="small"
            disableCloseOnSelect={
              typeof autocompleteProps?.disableCloseOnSelect === 'boolean'
                ? autocompleteProps.disableCloseOnSelect
                : !!multiple
            }
            isOptionEqualToValue={
              autocompleteProps?.isOptionEqualToValue
                ? autocompleteProps.isOptionEqualToValue
                : (option, value) => {
                    return value ? option.id === (value?.id ?? value) : false;
                  }
            }
            getOptionLabel={
              autocompleteProps?.getOptionLabel
                ? autocompleteProps.getOptionLabel
                : (option) => {
                    return typeof option === 'object' && option !== null && 'label' in option
                      ? `${option.label}`
                      : `${option}`;
                  }
            }
            onChange={(event, value, reason, details) => {
              let changedVal = value;
              if (matchId) {
                changedVal = Array.isArray(value)
                  ? value.map((i: any) => i?.id ?? i)
                  : typeof value === 'object' && value !== null && 'id' in value
                  ? `${value.id}`
                  : `${value}`;
              }
              onChange(changedVal);
              if (autocompleteProps?.onChange) {
                autocompleteProps.onChange(event, value, reason, details);
              }
            }}
            renderOption={
              autocompleteProps?.renderOption ??
              ((props, option, { selected }) => (
                <Box component="li" {...props} key={option.id}>
                  {showCheckbox && <Checkbox sx={{ marginRight: 1 }} checked={selected} />}
                  {autocompleteProps?.getOptionLabel?.(option) || option.label?.toString() || option.toString()}
                </Box>
              ))
            }
            onBlur={(event) => {
              onBlur();
              if (typeof autocompleteProps?.onBlur === 'function') {
                autocompleteProps.onBlur(event);
              }
            }}
            renderInput={(params) => (
              <Stack width="100%">
                {label && (
                  <Grid display="flex" gap={1}>
                    <InputLabel
                      htmlFor={name}
                      required={rules?.required ? true : required}
                      error={!!error}
                      sx={{ mb: 1 }}
                    >
                      {label}
                    </InputLabel>
                    {helpIconTooltip && (
                      <Tooltip title={helpIconTooltip} arrow>
                        <HelpOutlineOutlinedIcon color="info" fontSize={'small'} />
                      </Tooltip>
                    )}
                  </Grid>
                )}
                <TextField
                  placeholder={placeholder}
                  name={name}
                  required={rules?.required ? true : required}
                  {...textFieldProps}
                  {...params}
                  error={!!error}
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    ...textFieldProps?.InputLabelProps,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    sx: { ...textFieldProps?.InputProps?.sx, borderRadius: '10px' },
                    endAdornment: (
                      <>
                        {isLoading ? loadingElement : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                    ...textFieldProps?.InputProps,
                  }}
                  inputProps={{
                    ...params.inputProps,
                    ...textFieldProps?.inputProps,
                  }}
                  helperText={
                    error
                      ? typeof customErrorFn === 'function'
                        ? customErrorFn(error)
                        : error.message
                      : textFieldProps?.helperText
                  }
                  inputRef={ref}
                />
              </Stack>
            )}
          />
        );
      }}
    />
  );
}
