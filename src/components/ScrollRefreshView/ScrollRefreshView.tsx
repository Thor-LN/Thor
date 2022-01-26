import React, {useCallback, useState} from 'react';
import {RefreshControl, RefreshControlProps, StyleSheet} from 'react-native';

import {useTheme} from '@/providers/ThemeProvider';
import {Box, IBoxProps, IScrollViewProps, ScrollView} from 'native-base';

type ScrollRefreshViewProps = IScrollViewProps &
  Pick<RefreshControlProps, 'onRefresh'> &
  Partial<Pick<IBoxProps, 'safeAreaTop' | 'flex'>>;

const ScrollRefreshView: React.FC<ScrollRefreshViewProps> = props => {
  const {
    children,
    onRefresh,
    contentContainerStyle,
    safeAreaTop,
    flex,
    ...rest
  } = props;

  const {theme} = useTheme();

  const [isManualRefresh, setIsManualRefresh] = useState(false);

  const handleRefresh = useCallback(async () => {
    try {
      setIsManualRefresh(true);
      await onRefresh?.();
    } finally {
      setIsManualRefresh(false);
    }
  }, [onRefresh]);

  return (
    <Box safeAreaTop={safeAreaTop} flex={flex}>
      <ScrollView
        contentContainerStyle={[style.container, contentContainerStyle]}
        refreshControl={
          <RefreshControl
            refreshing={isManualRefresh}
            onRefresh={handleRefresh}
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
