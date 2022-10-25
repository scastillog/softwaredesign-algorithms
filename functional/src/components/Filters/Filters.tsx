import { useState, FC, useEffect, Dispatch } from 'react';
import Checkbox from '@mui/material/Checkbox';

import { Row, TableAction, ActionKind } from 'src/types';

import styles from './Filters.module.scss';

interface FiltersProps {
  store?: Row[];
  updateStore?: Dispatch<TableAction>;
}

const OPTIONS = [
  {
    title: 'Without posts',
  },
  {
    title: 'More than 100 posts',
  },
];

const isFilterSelected = selectedFilter => title =>
  selectedFilter.find(filter => filter === title);

const withoutPostFn = (row: Row) => row.posts === 0;
const moreThan100Fn = (row: Row) => row.posts > 100;

export const Filters: FC<FiltersProps> = ({ store, updateStore }) => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  useEffect(() => {
    let payload = [];
    if (isFilterSelected(selectedFilter)('Without posts')) {
      payload = store.filter(withoutPostFn);
    }

    if (isFilterSelected(selectedFilter)('More than 100 posts')) {
      payload = store.filter(moreThan100Fn);
    }

    updateStore({ type: ActionKind.FILTER, payload });
  }, [selectedFilter]);

  const onChange = ({ title }) => {
    let updatedFilters: string[];

    if (isFilterSelected(selectedFilter)(title)) {
      updatedFilters = selectedFilter.filter(filter => filter !== title);
    } else {
      updatedFilters = [...selectedFilter, title];
    }

    setSelectedFilter(updatedFilters);
  };

  return (
    <div className={styles.group}>
      <div className={styles.title}>Filter by posts</div>
      <ul className={styles.list}>
        {OPTIONS.map(option => (
          <li
            value={option.title}
            key={option.title}
            onClick={() => onChange(option)}
          >
            <Checkbox
              checked={!!selectedFilter.find(filter => filter === option.title)}
              value={option.title}
              size="small"
              color="primary"
              onChange={() => onChange(option)}
            />
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
