import { Image, User, Account, Row, TableState } from 'src/types';

export const dataConverter = (
  users: User[],
  accounts: Account[],
  images: Image[]
): Row[] => {
  const getLastPayment = (acc, payment) =>
    new Date(acc.date) > new Date(payment.date) ? acc : payment;

  const findUserById = userId => user => userId === user.userID;
  const findUrlById = userId => image => userId === image.userID;

  return accounts
    .map(item => {
      const last = item.payments.reduce(getLastPayment, item.payments[0]);
      return {
        userID: item.userID,
        posts: item.posts,
        lastPayments: last?.totalSum ?? 0,
      };
    })
    .map(({ userID, posts, lastPayments }) => {
      const { username, name, country } = users.find(findUserById(userID));
      const { url } = images.find(findUrlById(userID));
      return {
        avatar: url,
        username,
        country,
        name,
        lastPayments,
        posts,
      };
    });
};

export const initRows = (rows: Row[]): TableState => {
  return {
    rows,
    filteredRows: [],
    renderedRows: rows,
    searchedRows: [],
    sortFunction: undefined,
  };
};

export const getRenderedRows = (
  filteredRows: Row[],
  searchedRows: Row[],
  rows: Row[],
  sortFunction: (a: Row, b: Row) => number
): Row[] => {
  const combineRows = [...filteredRows, ...searchedRows];

  if (combineRows.length === 0) {
    return rows;
  }

  combineRows.sort(sortFunction);

  return combineRows;
};
