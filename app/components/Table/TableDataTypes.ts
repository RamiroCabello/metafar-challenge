import { Stock } from '../../utils/interfaces';

export const headers: string[] = ['Símbolo', 'Nombre', 'Moneda', 'Tipo'];

export const tableKeys: (keyof Stock)[] = ['symbol', 'name', 'currency', 'type'];

export const rowsPerPage: number = 5;

export const initPagination = {
  start: 0,
  end: 0,
  total: 0,
  page: 0,
  totalPages: 0,
  back: false,
  next: false
};

export const firstId: keyof Stock = 'symbol';
export const secondId: keyof Stock = 'exchange';