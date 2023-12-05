import { useState, useEffect } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './styles.module.scss';
import { StockPriceData } from '../../utils/interfaces';

const StockCharts = ({ stockPrice, name }: { stockPrice: StockPriceData[] | undefined, name: string }) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

  useEffect(() => {
    if (stockPrice && stockPrice?.length > 0) {
      setChartOptions({
        title: {
          text: name,
        },
        xAxis: {
          categories: stockPrice.map(stock => stock.datetime.slice(11, 16)).reverse(),
          title: {
            text: 'Intervalo de Tiempo'
          }
        },
        series: [
          {
            type: 'line',
            data: stockPrice.map(stock => parseFloat(stock.open)).reverse(),
          },
        ],
        yAxis: {
          title: {
            text: 'Cotización'
          }
        }
      });
    }
  }, [stockPrice]);

  return (
    <div className={styles.chartContainer}>
      {
        stockPrice && stockPrice?.length > 0
          ?
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
          :
          <div>No se encontraron datos o estos no están disponibles para su plan actual</div>
      }
    </div>
  )
};

export default StockCharts;