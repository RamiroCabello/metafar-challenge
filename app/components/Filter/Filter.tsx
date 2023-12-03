import { ChangeEvent, FormEvent, SetStateAction, useState, Dispatch } from 'react';
import axios from 'axios';
import { Stock } from '../../utils/interfaces';
import styles from './styles.module.scss';

const Filter = ({ setStockData }: { setStockData: Dispatch<SetStateAction<Stock[]>> }) => {
  const [exchangeFilter, setExchangeFilter] = useState<string>('');
  const [symbolFilter, setSymbolFilter] = useState<string>('');

  const handleExchangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExchangeFilter(e.target.value);
  };

  const handleSymbolChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSymbolFilter(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.get('/api/stocks', {
      params: {
        symbol: symbolFilter.toUpperCase(),
        exchange: exchangeFilter.toUpperCase()
      }
    })
      .then(res => {
        console.log(res);
        setStockData(res.data.data);
      });

  };

  return (
    <div className={styles.filtersMain}>
      <div className={styles.filterContainer}>
        <h4>Filtros</h4>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContainer}>
            <div className={styles.nameContainer}>
              <label className={styles.nameLabel}>Exchange:</label>
              <input className={styles.nameInput} value={exchangeFilter} onChange={handleExchangeChange} type='text' />
            </div>
            <div className={styles.symbolContainer}>
              <label className={styles.symbolLabel}>Simbolo:</label>
              <input className={styles.symbolInput} value={symbolFilter} onChange={handleSymbolChange} type='text' />
            </div>
            <div className={styles.submitContainer}>
              <button type='submit' className={styles.submitButton}>
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Filter;