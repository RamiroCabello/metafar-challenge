import { SetStateAction, Dispatch } from 'react';
import axios from 'axios';
import { Stock } from '../../utils/interfaces';
import styles from './styles.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FilterFormData {
  symbol: string;
  exchange: string;
};

const Filter = ({ setStockData }: { setStockData: Dispatch<SetStateAction<Stock[] | undefined>> }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FilterFormData>({
    defaultValues: {
      symbol: '',
      exchange: ''
    }
  });

  const onSubmit: SubmitHandler<FilterFormData> = (data, e) => {
    e?.preventDefault();

    axios.get('/api/stocks', {
      params: {
        symbol: data.symbol.toUpperCase(),
        exchange: data.exchange.toUpperCase()
      }
    })
      .then(res => {
        setStockData(res.data.data);
      });
  };

  return (
    <div className={styles.filtersMain}>
      <div className={styles.filterContainer}>
        <h4>Filtros:</h4>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formContainer}>
            <div className={styles.symbolContainer}>
              <label>Símbolo:</label>
              <input className={styles.symbolInput} type='text' {...register('symbol', {required: '*El campo Símbolo es obligatorio'})} />
            </div>
            <div className={styles.nameContainer}>
              <label>Exchange:</label>
              <input className={styles.nameInput} type='text' {...register('exchange')} />
            </div>
            <div>
              <button type='submit' className={styles.submitButton}>
                Buscar
              </button>
            </div>
          </div>
          {errors.symbol && <div className={styles.errorMessage}>{errors.symbol.message}</div>}
        </form>
      </div>
    </div>
  )
};

export default Filter;