import Image from 'next/image';
import { Box, Card, Divider, Grid2 as Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { useRetrieveMisCapacitacionesQuery } from '@/app/(modules)/habilidades-blandas/services';

export type CapacitacionesContentProps = {
  slug: string;
};

export function CapacitacionesContent(props: CapacitacionesContentProps) {
  const { slug } = props;
  const { data: misCapacitaciones, isLoading } = useRetrieveMisCapacitacionesQuery(slug);

  return (
    <Paper elevation={1}>
      <Grid container p={5} spacing={3}>
        {!!!misCapacitaciones ? (
          <Stack
            spacing={8}
            flexGrow={1}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src="/images/emptyFolder.png" alt="setting" width="200" height="200" />
            <Typography fontSize={18} mt={3}>
              No existen capacitaciones para esta habilidad blanda por el momento
            </Typography>
          </Stack>
        ) : (
          misCapacitaciones.map((capacitacion) => (
            <Card key={capacitacion.id} sx={{ width: 350 }}>
              <Stack gap={1} p={2}>
                <Typography variant="h5" color="grayText" fontWeight={600}>
                  {capacitacion.title}
                </Typography>
                <Link
                  underline="hover"
                  variant="body1"
                  sx={{ textDecoration: 'none', color: 'primary.main' }}
                  href={capacitacion.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver enlace
                </Link>
              </Stack>
              <Divider />
              <Box p={2}>{capacitacion.description}</Box>
            </Card>
          ))
        )}
      </Grid>
    </Paper>
  );
}
