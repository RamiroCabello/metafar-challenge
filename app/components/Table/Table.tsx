
import { Stock } from '../../utils/interfaces';
import Link from 'next/link';
import styles from './styles.module.scss';

const headers: string[] = ['Simbolo', 'Nombre', 'Moneda', 'Tipo'];
const tableKeys: (keyof Stock)[] = ['symbol', 'name', 'currency', 'type'];
const rowsPerPage: number = 10;

const firstId: keyof Stock = 'symbol';
const secondId: keyof Stock = 'exchange';

const Table = ({ stockData }: { stockData: Stock[] }) => {

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            {
              headers.map((header: string) =>
                <th key={header} className={styles.tableHeaderData}>
                  {header}
                </th>
              )
            }
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {stockData.length > 0 ?
            stockData.map((data: Stock, index) => {
              return (
                <tr key={data.symbol + `-${index}`}>
                  {
                    tableKeys.map(key =>
                      <td key={key} className={styles.tableBodyData}>
                        {
                          key === firstId
                            ?
                            <Link href={`/stock/${data[firstId]}/${data[secondId]}`}>
                              {data[key]}
                            </Link>
                            : data[key]
                        }
                      </td>
                    )
                  }
                </tr>
              )
            })
            :
            <tr>
              <td colSpan={headers.length}>
                No data found
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
};

export default Table;