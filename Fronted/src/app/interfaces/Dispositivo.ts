export interface Dispositivo {
  id?:string
  name: string;
  type: string;
  port: number;
  rack?: string;
  poe?: boolean;
  manageable?: boolean;
  area?: string;
}
