import NextLink from 'next/link';
import {
  AddOutlined as AddOutlinedIcon,
  CleaningServicesOutlined as CleaningServicesOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from '@mui/icons-material';
import { LoadingButton as Button } from '@mui/lab';
import { IconButton, InputAdornment } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { FormContainer, Select, TextField } from '@/components';
import { usePreguntasTableFilters } from '../../hooks';

export type PreguntasTableFiltersProps = {
  onFilterChange?: (filterModel: GridFilterModel) => void;
  handleCreate: () => void;
};

export function PreguntasTableFilters(props: PreguntasTableFiltersProps) {
  const { formContext, handleReset, isViewPage } = usePreguntasTableFilters(props);
  const { handleCreate } = props;

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
      <Select
        select
        name="isActive"
        placeholder={'Estado'}
        size="small"
        stackProps={{ width: 110 }}
        options={[
          {
            id: 'true',
            label: 'Activa',
          },
          {
            id: 'false',
            label: 'Inactiva',
          },
          {
            id: 'null',
            label: 'Todas',
          },
        ]}
      />
      <IconButton color="primary" onClick={handleReset} title={'Limpiar filtros'}>
        <CleaningServicesOutlinedIcon />
      </IconButton>
      {!isViewPage && (
        <Button
          startIcon={<AddOutlinedIcon />}
          type="button"
          variant="contained"
          color="secondary"
          sx={{ minWidth: '25%' }}
          onClick={handleCreate}
        >
          Crear pregunta
        </Button>
      )}
    </FormContainer>
  );
}
