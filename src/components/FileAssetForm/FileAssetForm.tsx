import { LoadingButton as Button } from '@mui/lab';
import { Box, Stack, Paper, Typography } from '@mui/material';
import { FormContainer, TextareaAutosize, DropzoneArea, TextField } from '@/components';
import { BASIC_ACCEPTED_FILES } from '@/consts';
import { useFileAssetForm, type UseFileAssetFormOptions } from '@/hooks';
import { FileAssetTable } from '../FileAssetTable';

export type FileAssetFormProps = UseFileAssetFormOptions;

export function FileAssetForm(props: FileAssetFormProps) {
  const { acceptedFiles = BASIC_ACCEPTED_FILES, textFormats, disabled } = props;
  const { formContext, isLoading, isViewPage, handleSubmit, initialFiles } = useFileAssetForm(props);

  return (
    <>
      <Paper sx={{ margin: 3, borderRadius: 3 }}>
        {!disabled && (
          <FormContainer
            formContext={formContext}
            onSuccess={handleSubmit}
            FormProps={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              p: 3,
              gap: 3,
            }}
          >
            <DropzoneArea
              acceptedFiles={acceptedFiles}
              name="path"
              // initialFiles={initialFiles}
            />
            {textFormats && (
              <Typography color="GrayText" variant="body2">
                {textFormats}
              </Typography>
            )}

            <TextareaAutosize
              resizeStyle="none"
              placeholder="Escribe observaciones que desees agregar al archivo adjunto"
              name="observations"
              label="Observaciones"
              rows={4}
              speech
              disabled={isViewPage}
            />
            <TextField
              placeholder="Inserte un link de referencia"
              name="reference_link"
              label='Link'
              speech
            />

            <Stack direction="row" spacing={4} py={2} justifyContent="flex-end">
              <Button type="button" color="secondary" onClick={props.onCompleted}>
                Cancelar
              </Button>
              <Button
                type="submit"
                sx={{ width: 150, height: '45px' }}
                color="secondary"
                variant="contained"
                loading={isLoading}
                disabled={isViewPage}
              >
                Guardar
              </Button>
            </Stack>
          </FormContainer>
        )}
      </Paper>

      {!props.fileAsset && (
        <Box p={3} gap={3}>
          <FileAssetTable {...props} />
        </Box>
      )}
    </>
  );
}
