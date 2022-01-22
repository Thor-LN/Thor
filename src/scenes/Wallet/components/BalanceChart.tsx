import React, {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {G} from 'react-native-svg';

import {useFormattedCurrency} from '@/hooks/useFormattedCurrency';
import {startCase} from 'lodash';
import {Text, View} from 'native-base';
import {VictoryPie, VictoryTooltip} from 'victory-native';

interface BalanceChartProps {
  confirmedBalance?: number | string;
  pendingBalance?: number | string;
  localBalance?: number | string;
  pendingLocalBalance?: number | string;
}

const ChartLabels = (props: any) => {
  const flyoutStyle = useMemo(
    () => ({
      fill: 'transparent',
      stroke: 'transparent',
      color: 'white',
    }),
    [],
  );

  return (
    <G>
      <VictoryTooltip
        {...props}
        renderInPortal={false}
        x={195}
        y={240}
        orientation="top"
        pointerLength={0}
        flyoutStyle={flyoutStyle}
      />
    </G>
  );
};

const BalanceChart = (props: BalanceChartProps) => {
  const {t} = useTranslation();

  const formattedCurrency = useFormattedCurrency();

  const [showInitialLabel, setShowInitialLabel] = useState(true);

  const data = useMemo(() => {
    const arr = Object.entries(props);

    return arr.map(entry => ({
      x: t(startCase(entry[0])),
      y: Number(entry[1]),
    }));
  }, [props, t]);

  const labels = useCallback(
    ({datum}: any) => {
      return `${datum.xName}:\n${formattedCurrency(datum.y)}`;
    },
    [formattedCurrency],
  );

  const handleEventClick = useCallback((labelProps: any) => {
    setShowInitialLabel(false);
    return {
      active: !labelProps.active,
    };
  }, []);

  return (
    <View>
      {showInitialLabel && (
        <View style={styles.initialLabel}>
          <Text>{t('Balances')}</Text>
        </View>
      )}
      <VictoryPie
        style={{labels: {fill: 'white'}}}
        innerRadius={100}
        data={data}
        colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
        labelComponent={<ChartLabels />}
        labels={labels}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPress: () => {
                return [
                  {
                    target: 'labels',
                    eventKey: 'all',
                    mutation: () => ({active: false}),
                  },
                  {
                    target: 'labels',
                    mutation: handleEventClick,
                  },
                ];
              },
            },
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  initialLabel: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BalanceChart;
