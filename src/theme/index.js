import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8D6E63', // Warm brown
      light: '#A1887F',
      dark: '#6D4C41',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#FF8A65', // Warm orange
      light: '#FFAB91',
      dark: '#E64A19',
      contrastText: '#FFF',
    },
    background: {
      default: '#FFF8E1', // Soft cream
      paper: '#FFFDF7',
    },
    success: {
      main: '#81C784',
      light: '#A5D6A7',
      dark: '#388E3C',
      contrastText: '#FFF',
    },
    error: {
      main: '#E57373',
      light: '#EF9A9A',
      dark: '#C62828',
      contrastText: '#FFF',
    },
    warning: {
      main: '#FFD54F',
      light: '#FFE082',
      dark: '#FFA000',
      contrastText: '#FFF',
    },
    text: {
      primary: '#5D4037',
      secondary: '#795548',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#5D4037',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#5D4037',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
      color: '#5D4037',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#5D4037',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#5D4037',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      color: '#5D4037',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.05), 0px 1px 1px 0px rgba(0,0,0,0.04), 0px 1px 3px 0px rgba(0,0,0,0.03)',
    '0px 3px 1px -2px rgba(0,0,0,0.05), 0px 2px 2px 0px rgba(0,0,0,0.04), 0px 1px 5px 0px rgba(0,0,0,0.03)',
    '0px 3px 3px -2px rgba(0,0,0,0.05), 0px 3px 4px 0px rgba(0,0,0,0.04), 0px 1px 8px 0px rgba(0,0,0,0.03)',
    '0px 2px 4px -1px rgba(0,0,0,0.05), 0px 4px 5px 0px rgba(0,0,0,0.04), 0px 1px 10px 0px rgba(0,0,0,0.03)',
    '0px 3px 5px -1px rgba(0,0,0,0.05), 0px 5px 8px 0px rgba(0,0,0,0.04), 0px 1px 14px 0px rgba(0,0,0,0.03)',
    '0px 3px 5px -1px rgba(0,0,0,0.05), 0px 6px 10px 0px rgba(0,0,0,0.04), 0px 1px 18px 0px rgba(0,0,0,0.03)',
    '0px 4px 5px -2px rgba(0,0,0,0.05), 0px 7px 10px 1px rgba(0,0,0,0.04), 0px 2px 16px 1px rgba(0,0,0,0.03)',
    '0px 5px 5px -3px rgba(0,0,0,0.05), 0px 8px 10px 1px rgba(0,0,0,0.04), 0px 3px 14px 2px rgba(0,0,0,0.03)',
    '0px 5px 6px -3px rgba(0,0,0,0.05), 0px 9px 12px 1px rgba(0,0,0,0.04), 0px 3px 16px 2px rgba(0,0,0,0.03)',
    '0px 6px 6px -3px rgba(0,0,0,0.05), 0px 10px 14px 1px rgba(0,0,0,0.04), 0px 4px 18px 3px rgba(0,0,0,0.03)',
    '0px 6px 7px -4px rgba(0,0,0,0.05), 0px 11px 15px 1px rgba(0,0,0,0.04), 0px 4px 20px 3px rgba(0,0,0,0.03)',
    '0px 7px 8px -4px rgba(0,0,0,0.05), 0px 12px 17px 2px rgba(0,0,0,0.04), 0px 5px 22px 4px rgba(0,0,0,0.03)',
    '0px 7px 8px -4px rgba(0,0,0,0.05), 0px 13px 19px 2px rgba(0,0,0,0.04), 0px 5px 24px 4px rgba(0,0,0,0.03)',
    '0px 7px 9px -4px rgba(0,0,0,0.05), 0px 14px 21px 2px rgba(0,0,0,0.04), 0px 5px 26px 4px rgba(0,0,0,0.03)',
    '0px 8px 9px -5px rgba(0,0,0,0.05), 0px 15px 22px 2px rgba(0,0,0,0.04), 0px 6px 28px 5px rgba(0,0,0,0.03)',
    '0px 8px 10px -5px rgba(0,0,0,0.05), 0px 16px 24px 2px rgba(0,0,0,0.04), 0px 6px 30px 5px rgba(0,0,0,0.03)',
    '0px 8px 11px -5px rgba(0,0,0,0.05), 0px 17px 26px 2px rgba(0,0,0,0.04), 0px 6px 32px 5px rgba(0,0,0,0.03)',
    '0px 9px 11px -5px rgba(0,0,0,0.05), 0px 18px 28px 2px rgba(0,0,0,0.04), 0px 7px 34px 6px rgba(0,0,0,0.03)',
    '0px 9px 12px -6px rgba(0,0,0,0.05), 0px 19px 29px 2px rgba(0,0,0,0.04), 0px 7px 36px 6px rgba(0,0,0,0.03)',
    '0px 10px 13px -6px rgba(0,0,0,0.05), 0px 20px 31px 3px rgba(0,0,0,0.04), 0px 8px 38px 7px rgba(0,0,0,0.03)',
    '0px 10px 13px -6px rgba(0,0,0,0.05), 0px 21px 33px 3px rgba(0,0,0,0.04), 0px 8px 40px 7px rgba(0,0,0,0.03)',
    '0px 10px 14px -6px rgba(0,0,0,0.05), 0px 22px 35px 3px rgba(0,0,0,0.04), 0px 8px 42px 7px rgba(0,0,0,0.03)',
    '0px 11px 14px -7px rgba(0,0,0,0.05), 0px 23px 36px 3px rgba(0,0,0,0.04), 0px 9px 44px 8px rgba(0,0,0,0.03)',
    '0px 11px 15px -7px rgba(0,0,0,0.05), 0px 24px 38px 3px rgba(0,0,0,0.04), 0px 9px 46px 8px rgba(0,0,0,0.03)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#8D6E63',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: 16,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: '#BBDEFB',
            },
            '&:hover fieldset': {
              borderColor: '#90CAF9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8D6E63',
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#8D6E63',
          '&.Mui-checked': {
            color: '#8D6E63',
          },
        },
      },
    },
  },
});

export default theme;