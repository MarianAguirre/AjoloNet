import { Component, OnInit } from '@angular/core';
import { Dispositivo } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enavironments } from '../../../../environments/envarionments';


@Component({
  selector: 'shared-equipos-pages',
  templateUrl: './equipos.component.html'
})
export class EquiposComponent implements OnInit {
  dispositivos: Dispositivo[] = [];
  baseUrl: string = enavironments.baseUrl;


  constructor(private equiposServices: EquiposServices, private http:HttpClient) {}

  ngOnInit(): void {
    this.equiposServices.getRouters().subscribe((data: any) => {
      this.dispositivos = data

    });
      // this.equiposServices.getSwitch().subscribe((data: any) => {
      //   this.dispositivos = data });
  }


  getRouters(): Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/router/`)
  }
  getSwitch(): Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>(`${this.baseUrl}/switch/`)
  }


  public orderBy:keyof Dispositivo | undefined| ''= '';

  changeOrder(value: keyof Dispositivo){
    this.orderBy= value;
  }

  productDialog: boolean = false;

  products!: Dispositivo[];

  product!: Dispositivo;

  selectedProducts!: Dispositivo[] | null;

  submitted: boolean = false;

  statuses!: any[];




  editProduct(product: Dispositivo) {
      this.product = { ...product };
      this.productDialog = true;
      console.log(this.product.name)
  }

  deleteProduct(product: Dispositivo) {

  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct(): void {
  }






}


