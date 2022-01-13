import React from 'react';
import {StyleSheet, View} from 'react-native';

const Body: React.FC = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
  },
});

export default Body;
