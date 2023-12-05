'use client';

import { useState } from 'react';
import DetailsPanel from '../../../components/DetailsPanel/DetailsPanel';
import ChartForm from '../../../components/ChartForm/ChartForm';
import StockCharts from '@/app/components/StocksChart/StocksChart';
import { StockPriceData } from '../../../utils/interfaces';

const StockDetail = ({ params }: { params: { symbol: string, exchange: string } }) => {
  const [stockPrice, setStockPrice] = useState<StockPriceData[] | undefined>(undefined);

  return (
    <section>
      <DetailsPanel symbol={params.symbol} exchange={params.exchange} />

      <ChartForm symbol={params.symbol} setStockPrice={setStockPrice} />

      {
        stockPrice && <StockCharts stockPrice={stockPrice} name={params.symbol}/>
      }
    </section>
  )
};

export default StockDetail;