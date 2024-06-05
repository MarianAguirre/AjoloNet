export interface Dispositivo {
  id:string
  name: string;
  type: string;
  conection?: string;
  port: number;
  poe?: boolean;
  manageable?: boolean;
  area?: string;

}
