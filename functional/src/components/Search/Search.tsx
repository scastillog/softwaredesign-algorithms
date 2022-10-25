import { useState, FC, useEffect, Dispatch } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { Row, TableAction, ActionKind } from 'src/types';

import styles from './Search.module.scss';

interface SearchProps {
  store?: Row[];
  updateStore?: Dispatch<TableAction>;
}

const searchFunction =
  (value: string) =>
  ({ country, name, username }: Row) => {
    return (
      country.toLowerCase() === value ||
      name.toLowerCase() === value ||
      username.toLowerCase() === value
    );
  };

export const Search: FC<SearchProps> = ({ store, updateStore }) => {
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    const value = searchedValue.toLowerCase();
    updateStore({
      type: ActionKind.SEARCH,
      payload: store.filter(searchFunction(value)),
    });
  }, [searchedValue]);

  const onChange = value => {
    setSearchedValue(value);
  };

  return (
    <OutlinedInput
      className={styles.input}
      placeholder="Search by country/name/username"
      value={searchedValue}
      type="search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      onChange={e => onChange(e.target.value)}
    />
  );
};
