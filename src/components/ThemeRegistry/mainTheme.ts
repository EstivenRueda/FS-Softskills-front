import { Lato, Poppins } from 'next/font/google';
import type { ThemeOptions } from '@mui/material';

export const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const palette = {
  primary: {
    main: '#FD8B51',
    light: '#F4DFD8',
    dark: '#CB6040',
  },
  secondary: {
    main: '#CB6040',
    light: '#CB6040',
    dark: '#fd9662',
  },
  success: {
    main: '#119328',
    light: '#119328',
    dark: '#02b3a9',
    contrastText: '#fff',
  },
  info: {
    main: '#5A6A85',
    light: '#EBF3FE',
    dark: '#1682d4',
    contrastText: '#fff',
  },
  error: {
    main: '#CF0E7B',
    light: '#CF0E7B',
    dark: '#c62828',
    contrastText: '#fff',
  },
  warning: {
    main: '#FBB62D',
    light: '#FBB62D',
    dark: '#e65100',
    contrastText: '#fff',
  },
  grey: {
    100: '#F2F6FA',
    200: '#EAEFF4',
    300: '#DFE5EF',
    400: '#7C8FAC',
    500: '#5A6A85',
    600: '#2A3547',
  },
  text: {
    primary: '#257180',
    secondary: '#4C4C4C',
  },
  action: {
    disabledBackground: 'rgba(73,82,88,0.12)',
    hoverOpacity: 0.02,
    hover: '#f6f9fc',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

export const mainTheme: ThemeOptions = {
  direction: 'ltr',
  palette,
  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontSize: '6rem',
      fontWeight: 300,
      lineHeight: 1.167,
      fontFamily: lato.style.fontFamily,
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 300,
      lineHeight: 1.2,
      fontFamily: lato.style.fontFamily,
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 400,
      lineHeight: 1.167,
      fontFamily: lato.style.fontFamily,
    },
    h4: {
      fontSize: '2.125rem',
      fontWeight: 400,
      lineHeight: 1.235,
      fontFamily: lato.style.fontFamily,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.334,
      fontFamily: lato.style.fontFamily,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.6,
      fontFamily: lato.style.fontFamily,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      fontFamily: poppins.style.fontFamily,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '7px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: palette.text.primary,
        },
        asterisk: {
          color: palette.error.main,
        },
      },
    },
    MuiStepButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.3,
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        iconContainer: {
          color: palette.grey[500],
          '&.Mui-active': {
            color: palette.primary.main,
          },
        },
        label: {
          color: palette.grey[500],
          '&.Mui-active': {
            color: palette.primary.main,
          },
          '&.MuiStepLabel-alternativeLabel': {
            marginTop: '0.5rem',
          },
        },
      },
    },
  },
};
