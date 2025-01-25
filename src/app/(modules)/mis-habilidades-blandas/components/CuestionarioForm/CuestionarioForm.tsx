import { LoadingButton as Button } from '@mui/lab';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FormContainer } from '@/components';
import { useCuestionarioForm } from '../../hooks';

export function CuestionarioForm() {
  const { formContext, handleSubmit, isLoading, randomQuestions, likertOptions, hasFinished } = useCuestionarioForm();

  return (
    <Box px={3}>
      <FormContainer formContext={formContext} onSuccess={handleSubmit}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: '50%' }}>Pregunta</TableCell>
                {likertOptions &&
                  likertOptions.map((option) => (
                    <TableCell key={`likert-option-${option.value}`} style={{ minWidth: 50 }}>
                      {option.display_name}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {randomQuestions &&
                randomQuestions.map((pregunta, idx) => (
                  <TableRow key={pregunta.id} tabIndex={-1} hover>
                    <TableCell>{pregunta.description}</TableCell>
                    {pregunta.options?.map((option) => <TableCell key={option.id}>{option.option}</TableCell>)}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={4} justifyContent="right" marginTop={3}>
          <Button type="submit" loading={isLoading} variant="contained" color="secondary">
            {hasFinished ? 'Finalizar' : 'Siguiente'}
          </Button>
        </Stack>
      </FormContainer>
    </Box>
  );
}
