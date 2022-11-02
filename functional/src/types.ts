export interface Image {
  userID: string;
  url: string;
}

export interface User {
  userID: string;
  username: string;
  country: string;
  name: string;
}

interface Payment {
  totalSum: number;
  date: string;
}

export interface Account {
  userID: string;
  posts: number;
  payments: Payment[];
}

export interface Row {
  avatar: string;
  username: string;
  country: string;
  name: string;
  lastPayments: number;
  posts: number;
}

export const enum ActionKind {
  INITIAL = 'INITIAL',
  FILTER = 'FILTER',
  SEARCH = 'SEARCH',
  SORT = 'SORT',
}

export interface TableAction {
  type: ActionKind;
  payload?: Row[];
  sortFunction?: (a: Row, b: Row) => number;
}

export interface TableState {
  rows: Row[];
  filteredRows: Row[];
  renderedRows: Row[];
  searchedRows: Row[];
  sortFunction: ((a: Row, b: Row) => number) | undefined;
}
