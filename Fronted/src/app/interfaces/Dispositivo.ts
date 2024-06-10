export interface Dispositivo {
  id?:string
  name: string;
  type: string;
  conection?: string;
  numberOfPorts?: number;
  poe?: boolean;
  manageable?: boolean;
  area?: string;

}

export interface Rack{
  id: string
}
