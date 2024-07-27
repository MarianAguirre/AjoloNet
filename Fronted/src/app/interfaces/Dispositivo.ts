import { MatCardModule } from '@angular/material/card';
export interface Device {
  id?: string
  name: string;
  deviceType: string;
  conection?: string;
  numberOfPorts?: number;
  poe?: boolean;
  manageable?: boolean;
  areaName: string;
  rackName: '';
  ipAddress: string;
  mac: string;
}

export interface Area {
  id: number;
  name: string;
  endDevices: EndDevice[];
}

export interface EndDevice {
  id: number;
  ports: Port[];
  name: string;
  numberOfPorts: number;
  deviceType: string;
  areaName: null;
}


export interface Rack {
  id: number;
  name: string;
  powerSplit: number;
  aSwitch: ASwitch[];
  patchPanels: PatchPanel[];
  routers: Routers[];
}

export interface ASwitch {
  id: number;
  name: string;
  ports: Port[];
  poe: boolean;
  manageable: boolean;
  deviceType: string;
  numberOfPorts: number;
}

export interface Port {
  id: number;
  portNumber: number;
}

export interface PatchPanel {
  id: number;
  ports: Port[];
  numberOfPorts: number;
  name: string;
  deviceType: string;
}
export interface Routers {
  id: number;
  ports: Port[];
  numberOfPorts: number;
  name: string;
  deviceType: string;
}

export interface Connections{
  sourceType  : string,
  sourceId  : string,
  sourcePort  : string,
  destinationType : string,
  destinationId : string,
  destinationPort : string,
}

export interface Maintenance{
  deviceType  : string,
  deviceId : string,
  deviceName  : string,
  maintenanceDate : string,
  performedBy : string,
  description : string,
  materialsUsed : string,
}
