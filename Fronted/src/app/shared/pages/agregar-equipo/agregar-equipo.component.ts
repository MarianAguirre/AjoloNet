import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import { enavironments } from '../../../../environments/envarionments';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'shared-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrls: ['./agregar-equipo.component.css']
})
export class AgregarEquipoComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private equiposServices: EquiposServices) {}

  @Output()
  public newEquip: EventEmitter<Dispositivo> = new EventEmitter();

  public equipo: Dispositivo = {
    name: '',
    deviceType: '',
    numberOfPorts: 0,
    poe: false,
    manageable: false,
    areaName: '',
    rackName: '',
    ipAddress: '',
    vlan_name: '',
    vlan_id: 0
  };
  public areas: string[] = [];
  public racks: string[] = [];
  public baseUrl = enavironments.baseUrl;
  public opciones: string[] = [];
  public value: any;
  public vlans: { vlan_id: number, vlan_name: string }[] = [];

  ngOnInit(): void {
    this.equiposServices.getArea().subscribe((areas: string[]) => {
      this.areas = areas;
    });
    this.equiposServices.getRack().subscribe((racks: string[]) => {
      this.racks = racks;
    });
    this.equiposServices.getTiposDispositivos().subscribe((tipos: string[]) => {
      this.opciones = tipos;
    });
  }

  updateVlans(vlans: { vlan_id: number, vlan_name: string }[]): void {
    this.vlans = vlans;
  }

  emitEquip(): void {
    if (!this.opciones.includes(this.equipo.deviceType) || this.equipo.numberOfPorts === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Faltan datos",
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    this.vlans.forEach((vlan, index) => {
      this.equipo[`vlan_id_${index + 1}`] = vlan.vlan_id;
      this.equipo[`vlan_name_${index + 1}`] = vlan.vlan_name;
    });

    console.log(this.equipo);
    this.newEquip.emit(this.equipo);
    this.equipo = { name: '', deviceType: '', numberOfPorts: 0, poe: false, manageable: false, areaName: '', rackName: '', ipAddress: '', vlan_name: '', vlan_id: 0 };
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Equipo guardado",
      showConfirmButton: false,
      timer: 1000
    });
  }

  goBack() {
    this.router.navigate(['red/equipos']);
  }
  goAreas() {
    this.router.navigate(['red/areas']);
  }
  goRacks() {
    this.router.navigate(['red/racks']);
  }

  newRouter(): void {
    if (this.equipo.name.length === 0 || !this.opciones.includes(this.equipo.deviceType) || this.equipo.numberOfPorts === 0 || this.equipo.rackName.length === 0) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/router`, this.equipo).subscribe(
      (data) => { }
    );
  }
  newSwitch(): void {
    if (this.equipo.name.length === 0 || !this.opciones.includes(this.equipo.deviceType) || this.equipo.numberOfPorts === 0 || this.equipo.rackName.length === 0) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/switch`, this.equipo).subscribe(
      (data) => { }
    );
  }
  newDispositivo(): void {
    if (this.equipo.name.length === 0 || this.equipo.numberOfPorts === 0 || this.equipo.areaName.length === 0) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/endDevice`, this.equipo).subscribe(
      (data) => { }
    );
  }
  newPatch(): void {
    if (this.equipo.numberOfPorts === 0 || this.equipo.rackName.length === 0) return;
    this.http.post<Dispositivo>(`${this.baseUrl}/patchPanel`, this.equipo).subscribe(
      (data) => { }
    );
  }
}
