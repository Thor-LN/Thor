import React from 'react';
import {RefreshControl, RefreshControlProps, StyleSheet} from 'react-native';

import {useTheme} from '@/providers/ThemeProvider';
import {Box, IBoxProps, IScrollViewProps, ScrollView} from 'native-base';

type ScrollRefreshViewProps = IScrollViewProps &
  Pick<RefreshControlProps, 'refreshing' | 'onRefresh'> &
  Partial<Pick<IBoxProps, 'safeAreaTop' | 'flex'>>;

const ScrollRefreshView: React.FC<ScrollRefreshViewProps> = props => {
  const {
    children,
    onRefresh,
    refreshing,
    contentContainerStyle,
    safeAreaTop,
    flex,
    ...rest
  } = props;

  const {theme} = useTheme();

  return (
    <Box safeAreaTop={safeAreaTop} flex={flex}>
      <ScrollView
        contentContainerStyle={[style.container, contentContainerStyle]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.text]}
            tintColor={theme.colors.text}
          />
        }
        {...rest}>
        {children}
      </ScrollView>
    </Box>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1,
  },
});

export default ScrollRefreshView;
