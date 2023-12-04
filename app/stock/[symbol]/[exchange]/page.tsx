'use client';

import styles from './styles.module.scss';
import DetailsPanel from '../../../components/DetailsPanel/DetailsPanel';
import ChartForm from '../../../components/ChartForm/ChartForm';

const StockDetail = ({ params }: { params: { symbol: string, exchange: string } }) => {  

  return (
    <section>
      <DetailsPanel symbol={params.symbol} exchange={params.exchange} />

      <ChartForm symbol={params.symbol} exchange={params.exchange} />
    </section>
  )

};

export default StockDetail;