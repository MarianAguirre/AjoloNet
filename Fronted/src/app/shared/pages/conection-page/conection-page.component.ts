import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid'
import { HttpClient } from '@angular/common/http';
import { enavironments } from '../../../../environments/envarionments';
import { ConectionService } from '../../services/conection.service';

@Component({
  selector: 'shared-conection-page',
  templateUrl: './conection-page.component.html',
  styleUrl: './conection-page.component.css'
})
export class ConectionPageComponent implements OnInit {
  constructor(private router: Router, private equiposServices: ConectionService, private http: HttpClient) { }
  public baseUrl: string = enavironments.baseUrl;
  public routers: { name: string, id: number }[] = [];
  public switches: { name: string, id: number }[] = [];
  public endDevices: { name: string, id: number }[] = [];
  public patchPanels: { name: string, id: number }[] = [];
  public nombres: string[] = [];
  public opciones: string[] = []


  public equipo: Dispositivo = {
    name: '',
    deviceType: '',
    numberOfPorts: 0,
    poe: false,
    manageable: false,
    areaName: '',
    rackName: '',
    ipAddress: ''
  }
  public equipo2: Dispositivo = {
    name: '',
    deviceType: '',
    numberOfPorts: 0,
    poe: false,
    manageable: false,
    areaName: '',
    rackName: '',
    ipAddress: ''
  }
  @Output()
  public newEquip: EventEmitter<Dispositivo> = new EventEmitter


  ngOnInit(): void {
    this.equiposServices.getTiposDispositivos().subscribe((tipos: string[]) => {
      this.opciones = tipos;
    });
    this.equiposServices.getNombresRouters().subscribe((routers: any[]) => {
      this.routers = routers;
    });
    this.equiposServices.getNombresSwitches().subscribe((switches: any[]) => {
      this.switches = switches;
    });
    this.equiposServices.getNombresEndDevices().subscribe((endDevices: any[]) => {
      this.endDevices = endDevices;
    });
    this.equiposServices.getNombresPatchPanels().subscribe((patchPanels: any[]) => {
      this.patchPanels = patchPanels;
    });
  }

  emitEquip(): void {
    if (this.equipo.name?.length === 0 || !this.opciones.includes(this.equipo.deviceType)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Falta el nombre o el tipo",
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    console.log(this.equipo);
    this.newEquip.emit(this.equipo)
    this.equipo = { id: uuid(), name: '', deviceType: '', numberOfPorts: 0, poe: false, manageable: false, areaName: '', rackName: '', ipAddress: '' }

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
}
