export interface Dispositivo {
  id?:string
  name: string;
  deviceType: string;
  conection?: string;
  numberOfPorts?: number;
  poe?: boolean;
  manageable?: boolean;
  area: string;

}

// export interface PatchPanel{
//   type: string;
//   numberOfPorts?: number;
// }


export interface Rack{
  id: string
}
