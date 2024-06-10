import { Pipe, type PipeTransform } from '@angular/core';
import { Dispositivo } from '../../interfaces/Dispositivo';

@Pipe({
  name: 'sortBy',
  standalone: true,
})
export class SortByPipe implements PipeTransform {

  transform(dispositivos: Dispositivo[], sortBy?: keyof Dispositivo | ''): Dispositivo[] {
    switch(sortBy){
      case 'name':
        return dispositivos.sort((a,b) => (a.name > b.name)? 1:-1);
      // case 'id':
      //   return dispositivos.sort((a, b) => (a.id > b.id) ? 1 : -1);
      case 'type':
        return dispositivos.sort((a,b) => (a.type > b.type)? 1:-1);

      default:
        return dispositivos;
      }
  }

}
