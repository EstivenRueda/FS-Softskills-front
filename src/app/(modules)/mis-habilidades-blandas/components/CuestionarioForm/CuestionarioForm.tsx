import { LoadingButton as Button } from '@mui/lab';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FormContainer, RadioButton } from '@/components';
import { useCuestionarioForm } from '../../hooks';

export function CuestionarioForm() {
  const { formContext, handleSubmit, isLoading, randomQuestions, likertOptions, hasFinished } = useCuestionarioForm();

  return (
    <Box px={3}>
      <FormContainer formContext={formContext} onSuccess={handleSubmit}>
        <TableContainer sx={{ maxHeight: '65vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ minWidth: '50%' }}>
                  Pregunta
                </TableCell>
                {likertOptions &&
                  likertOptions.map((option) => (
                    <TableCell align="center" key={`likert-option-${option.value}`} style={{ minWidth: 50 }}>
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

                      <RadioButton
                        name={`answers[${idx}].option`}
                        options={pregunta.options}
                        required
                      />
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
