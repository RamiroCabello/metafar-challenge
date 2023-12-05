
import { useEffect, useState } from 'react';
import { Stock } from '../../utils/interfaces';
import Link from 'next/link';
import styles from './styles.module.scss';
import { headers, tableKeys, rowsPerPage, initPagination, firstId, secondId} from './TableDataTypes';

const Table = ({ stockData }: { stockData: Stock[] }) => {
  const [paginatedData, setPaginatedData] = useState<Stock[]>([]);
  const [paginationData, setPaginationData] = useState(initPagination);

  useEffect(() => {
    if (stockData.length === 0) {
      setPaginatedData(stockData);
      setPaginationData(initPagination);
    } 

    else if (stockData.length <= rowsPerPage) {
      setPaginatedData(stockData);
      setPaginationData({
        start: 1, end: stockData.length, total: stockData.length, page: 1, totalPages: 1, back: false, next: false
      });
    }

    else {
      let totalPages = Math.trunc(stockData.length / rowsPerPage);
      if (stockData.length % rowsPerPage !== 0) totalPages++;

      setPaginatedData(stockData.slice(0, rowsPerPage));
      setPaginationData({
        start: 1, end: rowsPerPage, total: stockData.length, page: 1, totalPages: totalPages, back: false, next: true
      });
    }
  }, [stockData]);

  const previousPage = () => {
    const newStart = paginationData.start - rowsPerPage - 1;
    setPaginatedData(stockData.slice(newStart, newStart + rowsPerPage));

    setPaginationData(prev => ({...prev,
      start: prev.start - rowsPerPage,
      end: prev.start - 1,
      page: prev.page - 1,
      back: prev.page -1 > 1,
      next: true
    }));
  };

  const nextPage = () => {
    setPaginatedData(stockData.slice(paginationData.end, paginationData.end + rowsPerPage));
    
    setPaginationData(prev => ({...prev,
      start: prev.start + rowsPerPage,
      end: prev.end + rowsPerPage > prev.total ? prev.total : prev.end + rowsPerPage, 
      page: prev.page + 1,
      back: true,
      next: prev.page + 1 < prev.totalPages
    }));
  };

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
          {paginatedData.length > 0 ?
            paginatedData.map((data: Stock, index) => {
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
                No se encontraron datos
              </td>
            </tr>
          }
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div className={styles.paginationControll}>
          <span className={styles.pageNumber}>
            Página: {paginationData.page}
          </span>
          <span className={`${styles.pageBack} ${!paginationData.back && styles.disabled}`} onClick={previousPage}>
            &lt;
          </span>
          {`${paginationData.start} - ${paginationData.end} de ${paginationData.total}`}
          <span className={`${styles.pageNext} ${!paginationData.next && styles.disabled}`} onClick={nextPage}>
            &gt;
          </span>
        </div>
      </div>
    </div>
  )
};

export default Table;