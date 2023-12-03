'use client';

import { useState} from 'react';
import { Stock } from './utils/interfaces';
import Filter from './components/Filter/Filter';
import Table from './components/Table/Table';
import styles from './page.module.scss'

const Home = () => {
  const [stockData, setStockData] = useState<Stock[]>([]);

  return (
    <section>
      <Filter setStockData={setStockData} />

      <Table stockData={stockData}/>
    </section>
  )
};

export default Home;
