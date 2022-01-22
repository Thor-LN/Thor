import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {G} from 'react-native-svg';

import {useFormattedCurrency} from '@/hooks/useFormattedCurrency';
import {startCase} from 'lodash';
import {VictoryPie, VictoryTooltip} from 'victory-native';

interface BalanceChartProps {
  confirmedBalance?: number | string;
  pendingBalance?: number | string;
  localBalance?: number | string;
  remoteBalance?: number | string;
  pendingLocalBalance?: number | string;
  pendingRemoteBalance?: number | string;
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

  return (
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
                  mutation: (labelProps: any) => ({
                    active: !labelProps.active,
                  }),
                },
              ];
            },
          },
        },
      ]}
    />
  );
};

export default BalanceChart;
