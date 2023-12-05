import { SetStateAction, useEffect, useRef, Dispatch } from "react";
import styles from './styles.module.scss';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SelectOption, StockPriceData} from '../../utils/interfaces';

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

const ChartForm = ({ symbol, setStockPrice }: { symbol: string, setStockPrice: Dispatch<SetStateAction<StockPriceData[] | undefined>> }) => {
  const realTimeInterval = useRef<NodeJS.Timeout>();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      radio: 'REALTIME',
      startDate: '',
      endDate: '',
      interval: '1min'
    }
  });

  const validateDate = (option: string, date: string) =>
    option === 'HISTORIC' ? date.replace('T', ' ') + ':00'  : undefined;

  const formatInterval = (interval: string) => {
    switch (interval ) {
      case '1min': return 60000;
      case '5min': return 300000;
      case '15min': return 900000;
    }
  };

  const setRealTimeInterval = (data: FormData) => {
    realTimeInterval.current = setInterval(() => {

      axios.post('/api/stockPrice', {
        symbol: symbol,
        interval: data.interval,
      })
        .then(res => 
          setStockPrice(res.data.values ? res.data.values : [])
        );

    }, formatInterval(data.interval));
  };


  const onSubmit: SubmitHandler<FormData> = (data, e) => {
    e?.preventDefault();

    axios.post('/api/stockPrice', {
      symbol: symbol,
      interval: data.interval,
      startDate: validateDate(data.radio, data.startDate),
      endDate: validateDate(data.radio, data.endDate),
    })
      .then(res => {
        setStockPrice(res.data.values ? res.data.values : []);

        if (data.radio === 'REALTIME') setRealTimeInterval(data)
        else clearInterval(realTimeInterval.current);
      });
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
          <input 
            type="datetime-local" 
            id="startDate" 
            {...register('startDate', {
              validate: (value) => (getValues("radio") === 'HISTORIC')
                ? value !== '' || '*La primera fecha es obligatoria'
                : true
            })} 
          />
          <label htmlFor="startDate">(desde)</label>
        </div>
        <div className={styles.endCell}>
          <input
            type="datetime-local"
            id="endDate"
            {...register('endDate', {
              validate: {
                historicValidate: (value) => (getValues("radio") === 'HISTORIC')
                  ? value !== '' || '*La segunda fecha es obligatoria'
                  : true,
                greatearThan: (value) => (getValues("radio") === 'HISTORIC' && value !== '') 
                  ? getValues('startDate') < value || '*La segunda fecha debe ser mayor a la primera' 
                  : true
              } 
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
          {errors.startDate && <span>{errors.startDate.message}</span>}
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