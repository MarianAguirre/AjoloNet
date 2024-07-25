import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDataService {
  private deviceType: string;
  private deviceId: string;

  setDeviceData(deviceType: string, deviceId: string) {
    this.deviceType = deviceType.toUpperCase();
    this.deviceId = deviceId;
  }

  getDeviceType(): string {
    return this.deviceType;
  }

  getDeviceId(): string {
    return this.deviceId;
  }
}
