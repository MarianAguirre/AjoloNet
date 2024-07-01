export interface User {
  username: string;
  firstname: string;
  lastname:string;
  password: string;
}

export interface DatosUser {
  id:                    number;
  username:              string;
  firstname:             string;
  lastname:              string;
  password:              string;
  role:                  string;
  enabled:               boolean;
  authorities:           Authority[];
  accountNonExpired:     boolean;
  accountNonLocked:      boolean;
  credentialsNonExpired: boolean;
}

export interface Authority {
  authority: string;
}
