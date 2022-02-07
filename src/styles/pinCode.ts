import {useTheme} from '@/providers/ThemeProvider';

export const usePinCodeStyles = () => {
  const {theme} = useTheme();

  return {
    colorCircleButtons: theme.colors.background,
    colorPassword: theme.colors.white,
    colorPasswordEmpty: theme.colors.white,
    colorPasswordError: (theme.colors.error as any)[500] as string,
    numbersButtonOverlayColor: theme.colors.primary[500],
    stylePinCodeButtonNumber: theme.colors.text,
    stylePinCodeColorSubtitle: theme.colors.text,
    stylePinCodeColorTitle: theme.colors.text,
  };
};
