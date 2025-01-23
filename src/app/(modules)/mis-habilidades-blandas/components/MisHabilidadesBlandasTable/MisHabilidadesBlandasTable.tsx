import { Typography } from '@mui/material';
import { MisHabilidadesBlandasInfo } from '../MisHabilidadesBlandasInfo';

export function MisHabilidadesBlandasTable() {

  return (
    <>
      <Typography variant="h4" color="text.primary" sx={{ mb: 3 }}>
        Mis Habilidades Blandas
      </Typography>
      <MisHabilidadesBlandasInfo/>

    </>
  )
}
