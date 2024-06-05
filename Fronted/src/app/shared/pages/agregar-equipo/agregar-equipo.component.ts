import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import {v4 as uuid} from 'uuid'
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposServices } from '../../services/equipos.service';




@Component({
  selector: 'shared-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent implements OnInit{

  // public myform: FormGroup = this.fb.group({
  //   type: ['', Validators.required],
  // })

  constructor(private router: Router, private fb:FormBuilder) { }


  ngOnInit(): void {

  }
  // this.onTypeChanged
  // onTypeChanged():void{
  //   this.myform.get('type')!.valueChanges
  //   .subscribe(type =>{

  //   })

  // }


  @Output()
  public newEquip: EventEmitter<Dispositivo> = new EventEmitter

  public equipo:Dispositivo ={
    id: uuid(),
    name: '',
    type: '',
    port: 0,
    conection:'',
    poe: false,
    manageable: false,
    area: ''
  }






  emitEquip():void{
    if(this.equipo.name.length === 0 ) return
      Swal.fire({
      position: "center",
      icon: "error",
      title: "Falta el nombre o el tipo del equipo",
      showConfirmButton: false,
      timer: 1000
    });
    if(!this.opciones.includes(this.equipo.type))
    return

    console.log(this.equipo);
    this.newEquip.emit(this.equipo)
    this.equipo = { id:uuid(), name:'', type:'',port: 0, conection:'', poe: false, manageable: false, area: ''}

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



  public opciones:string[] = [
    'Switch',
    'Router',
    'Dispositivo final',
    'Patch Panel'
  ]
  public conections:string[] = [
    'Switch',
    'Router',
    'Dispositivo final',
    'Patch Panel',
    'Rack'
  ]





  }


