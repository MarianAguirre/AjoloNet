export interface User {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface DataUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  role: string;
}

export interface Authority {
  authority: string;
}

export interface Users {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: any;
  role: string;
}
