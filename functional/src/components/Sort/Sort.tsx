import { Dispatch, FC } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { ActionKind, Row, TableAction } from 'src/types';

import styles from './Sort.module.scss';

const ascFunction = (a: Row, b: Row) => a.lastPayments - b.lastPayments;
const descFunction = (a: Row, b: Row) => b.lastPayments - a.lastPayments;

interface SortProps {
  store?: Row[];
  updateStore?: Dispatch<TableAction>;
}

export const Sort: FC<SortProps> = ({ store, updateStore }) => {
  const handleChange = value => {
    let sortFunction;
    if (value === 'asc') {
      sortFunction = ascFunction;
    }

    if (value === 'desc') {
      sortFunction = descFunction;
    }

    updateStore({ type: ActionKind.SORT, sortFunction });
  };

  return (
    <FormControl className={styles.control} component="fieldset">
      <FormLabel className={styles.label}>Sort by payments</FormLabel>
      <RadioGroup
        className={styles.group}
        aria-label="sorting"
        name="radio-buttons-group"
        onChange={e => handleChange(e.target.value)}
      >
        <FormControlLabel value="desc" control={<Radio />} label="desc" />
        <FormControlLabel value="asc" control={<Radio />} label="asc" />
      </RadioGroup>
    </FormControl>
  );
};
