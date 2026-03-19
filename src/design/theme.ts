import { createTheme } from '@mui/material/styles';

export const designTokens = {
  colors: {
    darkBlue: '#2432D4',
    lightBlue: '#869EFF',
    lightGreen: '#AEFDAA',
    black: '#000000',
    lightGray: '#C5C5C5',
    white: '#FFFFFF',
    page: '#F6F8FF',
  },
  radius: {
    small: 10,
    input: 5,
    button: 15,
    card: 24,
  },
};

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
  }
}

export const appTheme = createTheme({
  palette: {
    primary: {
      main: designTokens.colors.darkBlue,
      light: designTokens.colors.lightBlue,
      contrastText: designTokens.colors.white,
    },
    secondary: {
      main: designTokens.colors.lightGreen,
      contrastText: designTokens.colors.black,
    },
    accent: {
      main: designTokens.colors.lightBlue,
      contrastText: designTokens.colors.black,
    },
    neutral: {
      main: designTokens.colors.lightGray,
      contrastText: designTokens.colors.black,
    },
    text: {
      primary: designTokens.colors.black,
      secondary: 'rgba(0, 0, 0, 0.66)',
    },
    background: {
      default: designTokens.colors.page,
      paper: designTokens.colors.white,
    },
  },
  shape: {
    borderRadius: designTokens.radius.card,
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: 1.35,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 1.35,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: 0,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--bb-dark-blue': designTokens.colors.darkBlue,
          '--bb-light-blue': designTokens.colors.lightBlue,
          '--bb-light-green': designTokens.colors.lightGreen,
          '--bb-light-gray': designTokens.colors.lightGray,
          '--bb-black': designTokens.colors.black,
          '--bb-white': designTokens.colors.white,
        },
        body: {
          background:
            'radial-gradient(circle at top left, rgba(134, 158, 255, 0.22), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f6f8ff 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.card,
          border: `1px solid ${designTokens.colors.lightGray}`,
          boxShadow: '0 18px 45px rgba(36, 50, 212, 0.08)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.colors.white,
          '& fieldset': {
            borderColor: designTokens.colors.lightGray,
            borderWidth: 2,
          },
          '&:hover fieldset': {
            borderColor: designTokens.colors.lightBlue,
          },
          '&.Mui-focused fieldset': {
            borderColor: designTokens.colors.darkBlue,
          },
        },
        input: {
          fontSize: '16px',
          padding: '10px 12px',
        },
      },
    },
  },
});