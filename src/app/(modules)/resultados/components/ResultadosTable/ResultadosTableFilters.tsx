import {
  CleaningServicesOutlined as CleaningServicesOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { FormContainer, TextField } from '@/components';
import { useResultadosTableFilters } from '../../hooks';

export type ResultadosTableFiltersProps = {
  onFilterChange?: (filterModel: GridFilterModel) => void;
};

export function ResultadosTableFilters(props: ResultadosTableFiltersProps) {
  const { formContext, handleReset } = useResultadosTableFilters(props);

  return (
    <FormContainer
      formContext={formContext}
      FormProps={{
        display: 'flex',
        gap: 2,
        mb: 2,
      }}
    >
      <TextField
        name="search"
        placeholder={'Buscar'}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
        size="small"
        sx={{ minWidth: 150 }}
        speech
      />
      <IconButton color="primary" onClick={handleReset} title={'Limpiar filtros'}>
        <CleaningServicesOutlinedIcon />
      </IconButton>
    </FormContainer>
  );
}
