import { Box, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LoginForm } from '../components';

export default function LoginPage() {
  return (
      <Grid container alignItems={'center'} justifyContent={'center'} sx={{ backgroundColor: 'primary.light'}}>
        <Grid size={12}>
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                p: 6,
                backgroundColor: 'transparent',
                borderRadius: '20px',
                boxShadow: '0 0 0px rgba(0, 0, 0, 0.2)',
                alignContent: 'center',
              }}
            >
              <LoginForm />
            </Card>
          </Box>
        </Grid>
      </Grid>
  );
}
