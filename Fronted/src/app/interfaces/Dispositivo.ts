export interface Dispositivo {
  id?:string
  name: string;
  deviceType: string;
  conection?: string;
  numberOfPorts?: number;
  poe?: boolean;
  manageable?: boolean;
  areaName: string;
  rackName:''
}

export interface Area {
  id:         number;
  name:       string;
  endDevices: EndDevice[];
}

export interface EndDevice {
  id:            number;
  ports:         Port[];
  name:          string;
  numberOfPorts: number;
  deviceType:    string;
  areaName:      null;
}


export interface Rack {
  id:          number;
  name:        string;
  powerSplit:  number;
  aSwitch:     ASwitch[];
  patchPanels: PatchPanel[];
  routers:     Routers[];
}

export interface ASwitch {
  id:            number;
  name:          string;
  ports:         Port[];
  poe:           boolean;
  manageable:    boolean;
  deviceType:    string;
  numberOfPorts: number;
}

export interface Port {
  id:                    number;
  portNumber:            number;
  sourceConnection:      null;
  destinationConnection: null;
}

export interface PatchPanel {
  id:            number;
  ports:         Port[];
  numberOfPorts: number;
  name:          string;
  deviceType:    string;
}
export interface Routers {
  id:            number;
  ports:         Port[];
  numberOfPorts: number;
  name:          string;
  deviceType:    string;
}



export interface Device {
  id:            number;
  ports:         Port[];
  name:          string;
  numberOfPorts: number;
  deviceType:    string;
  areaName?:     null;
  rackName?:     null;
  poe?:          boolean;
  manageable?:   boolean;
}

export interface Port {
  id:                    number;
  portNumber:            number;
  sourceConnection:      null;
  destinationConnection: null;
}
