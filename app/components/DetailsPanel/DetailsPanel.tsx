import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import axios from 'axios';
import { Stock } from '../../utils/interfaces';

const DetailsPanel = ({ symbol, exchange }: { symbol: string, exchange: string }) => {
  const [stockDetails, setStockDetails] = useState<Stock | undefined>(undefined);

  useEffect(() => {
    axios.get('/api/stocks', {
      params: {
        symbol: symbol,
        exchange: exchange
      }
    })
      .then(res => {
        setStockDetails(res.data.data[0]);
      });
  }, []);

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsData}>
        <div className={styles.detailsCell}>Símbolo: {stockDetails?.symbol}</div>
        <div className={styles.detailsCell}>Nombre: {stockDetails?.name}</div>
        <div className={styles.detailsCell}>Exchange: {stockDetails?.exchange}</div>
        <div className={styles.detailsCell}>País: {stockDetails?.country}</div>
        <div className={styles.detailsCell}>Moneda: {stockDetails?.currency}</div>
        <div className={styles.detailsCell}>Tipo: {stockDetails?.type}</div>
      </div>
    </div>
  )
};

export default DetailsPanel;