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
}

export interface Authority {
  authority: string;
}

export interface Usuarios {
  id:                    number;
  username:              string;
  firstname:             string;
  lastname:              string;
  password:              any;
  role:                  string;
}



