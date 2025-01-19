import { isEqual, uniqBy } from 'lodash';

export function mapOptionKeys(options: any[], valueKey: string, labelKey: string | string[], labelSeparator: string) {
  if (!options?.length) return [];
  if (valueKey === 'id' && labelKey === 'label') return options;
  const mappedOptions = options?.map((option) => ({
    id: option[valueKey],
    label: Array.isArray(labelKey)
      ? labelKey
          .map((key) => option[key])
          .filter(Boolean)
          .join(labelSeparator)
      : option[labelKey],
  }));
  if (isEqual(valueKey, labelKey)) {
    return uniqBy(mappedOptions, 'id');
  }
  return mappedOptions;
}
