import { FC, useReducer, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import {
  Image,
  User,
  Account,
  ActionKind,
  TableAction,
  TableState,
} from 'src/types';
import { Table, Filters, Sort, Search } from 'src/components';

import { getImages, getUsers, getAccounts } from './mocks/api';
import { initRows, getRenderedRows, dataConverter } from './utils';

import styles from './App.module.scss';

const initialConfig: TableState = {
  rows: [],
  filteredRows: [],
  renderedRows: [],
  searchedRows: [],
  sortFunction: undefined,
};

const rowsReducer = (
  state: TableState,
  { type, payload, sortFunction }: TableAction
): TableState => {
  const { rows, filteredRows, searchedRows, renderedRows } = state;
  switch (type) {
    case ActionKind.INITIAL:
      return initRows(payload);
    case ActionKind.FILTER:
      const cleanData = filteredRows.filter(item => payload.includes(item));
      const filterRows =
        cleanData.length > 0
          ? cleanData
          : payload.length > 0
          ? [...payload, ...filteredRows]
          : payload;

      return {
        ...state,
        filteredRows: filterRows,
        renderedRows: getRenderedRows(
          filterRows,
          searchedRows,
          rows,
          state.sortFunction
        ),
      };
    case ActionKind.SEARCH:
      const searchRow = payload ?? [];
      return {
        ...state,
        searchedRows: searchRow,
        renderedRows: getRenderedRows(
          filteredRows,
          searchRow,
          rows,
          state.sortFunction
        ),
      };
    case ActionKind.SORT:
      return {
        ...state,
        renderedRows: renderedRows.sort(sortFunction),
        sortFunction,
      };
    default:
      return state;
  }
};

export const App: FC = () => {
  const [state, dispatch] = useReducer(rowsReducer, initialConfig);

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => {
        dispatch({
          type: ActionKind.INITIAL,
          payload: dataConverter(users, accounts, images),
        });
      }
    );
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters store={state.rows} updateStore={dispatch} />
            <Sort store={state.renderedRows} updateStore={dispatch} />
          </div>
          <Search store={state.rows} updateStore={dispatch} />
        </div>
        <Table rows={state.renderedRows} />
      </div>
    </StyledEngineProvider>
  );
};
