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
  lastPeyments: number;
  posts: number;
}
