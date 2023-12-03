'use client';

import { useEffect, useState } from "react";
import axios from 'axios';
import { Stock } from "../../../utils/interfaces";
import styles from './styles.module.scss';

const StockDetail = ({ params }: { params: { symbol: string, exchange: string } }) => {
  const [stockDetails, setStockDetails] = useState<Stock | undefined>(undefined);

  useEffect(() => {
    axios.get('/api/stocks', {
      params: {
        symbol: params.symbol,
        exchange: params.exchange
      }
    })
      .then(res => {
        setStockDetails(res.data.data[0]);
      });
  }, []);

  return (
    <section>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsData}>
          <div className={styles.detailsCell}>Simbolo: {stockDetails?.symbol}</div>
          <div className={styles.detailsCell}>Nombre: {stockDetails?.name}</div>
          <div className={styles.detailsCell}>Exchange: {stockDetails?.exchange}</div>
          <div className={styles.detailsCell}>País: {stockDetails?.country}</div>
          <div className={styles.detailsCell}>Moneda: {stockDetails?.currency}</div>
          <div className={styles.detailsCell}>Tipo: {stockDetails?.type}</div>
        </div>
      </div>
    </section>
  )

};

export default StockDetail;