import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView as SAV} from 'react-native-safe-area-context';

const SafeAreaView: React.FC = ({children}) => {
  return <SAV style={styles.container}>{children}</SAV>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaView;
