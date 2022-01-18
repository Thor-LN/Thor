import {StyleSheet} from 'react-native';

const lottieStyle = (height: number | string, width: number | string) =>
  StyleSheet.create({
    container: {
      height,
      width,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default lottieStyle;
