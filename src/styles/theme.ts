import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import merge from 'deepmerge';
import {extendTheme, ITheme} from 'native-base';

const Theme: ITheme = extendTheme({
  colors: {
    primary: {
      50: '#f4eefe',
      100: '#d9d0e4',
      200: '#beb2ce',
      300: '#a394b9',
      400: '#8975a3',
      500: '#705c8a',
      600: '#57476c',
      700: '#3e334f',
      800: '#261e31',
      900: '#0f0817',
    },
    secondary: {
      50: '#dcf7ff',
      100: '#aee3ff',
      200: '#7fcfff',
      300: '#4ebcfd',
      400: '#24a8fc',
      500: '#108fe2',
      600: '#026fb1',
      700: '#004f7f',
      800: '#00304f',
      900: '#00111f',
    },
    background: '#17062d',
    text: '#ffffff',
  },
  components: {
    Heading: {
      baseStyle: {
        color: '#ffffff',
      },
    },
    Text: {
      baseStyle: {
        color: '#ffffff',
      },
    },
  },
});

export const DefaultTheme = merge(NavigationDefaultTheme, Theme);
