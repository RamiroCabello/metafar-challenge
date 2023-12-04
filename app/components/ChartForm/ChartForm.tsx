import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SelectOption} from '../../utils/interfaces';

const options: SelectOption[] = [
  { label: '1 min', value: '1min' },
  { label: '5 min', value: '5min' },
  { label: '15 min', value: '15min' }
];

interface FormData {
  radio: string;
  startDate: string;
  endDate: string;
  interval: string;
};

const ChartForm = ({ symbol, exchange }: { symbol: string, exchange: string }) => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      radio: 'REALTIME',
      startDate: new Date().toISOString().slice(0, 16),
      endDate: '',
      interval: '1min'
    }
  });

  const onSubmit: SubmitHandler<FormData> = (data, e) => {
    e?.preventDefault();
    console.log(data);

    axios.post('/api/stockPrice', {
      symbol: symbol,
      interval: data.interval,
      exchange: exchange,
      startDate: data.startDate.replace('T', ' ') + ':00',
      endDate: data.endDate.replace('T', ' ') + ':00',
    })
      .then(res => {
        console.log(res.data.values);
      })
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.formData} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.timeCell}>
          <input type="radio" value="REALTIME" id="realTime" {...register('radio', { required: true })} />
          <label htmlFor="realTime">Tiempo Real</label>
        </div>

        <div className={styles.historicCell}>
          <input type="radio" value="HISTORIC" id="historic" {...register('radio', { required: true })} />
          <label htmlFor="historic">Histórico:</label>
        </div>

        <div className={styles.startCell}>
          <input type="datetime-local" id="startDate" {...register('startDate')} />
          <label htmlFor="startDate">(desde)</label>
        </div>

        <div className={styles.endCell}>
          <input
            type="datetime-local"
            id="endDate"
            {...register('endDate', {
              validate: (value) => (getValues("radio") === 'HISTORIC' && value !== '') 
                ? getValues('startDate') < value || '*La segunda fecha debe ser mayor a la primera' 
                : true
            })}
          />
          <label htmlFor="endDate">(hasta)</label>
        </div>

        <div className={styles.intervalCell}>
          <label htmlFor="interval">Intervalo:</label>
        </div>

        <div className={styles.optionCell}>
          <select id="interval" {...register('interval', { required: true })}>
            {
              options.map(option =>
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>)
            }
          </select>
        </div>

        <div className={styles.errorCell}>
          {errors.endDate && <span>{errors.endDate.message}</span>}
        </div>
        <div className={styles.submitCell}>
          <button type="submit">Graficar</button>
        </div>
      </form>
    </div>
  )
};

export default ChartForm;