import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from '../../../interfaces/Dispositivo';
import { EquiposServices } from '../../services/equipos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'select-rack',
  templateUrl: './select-rack.component.html',
  styleUrl: './select-rack.component.css'
})
export class SelectRackComponent {
  constructor(private equiposServices: EquiposServices, private router: Router) { }


  @Input() public dispositivos: Device[] = [];
  @Input() public equipo!: Device;
  @Input() public racks: string[] = [];
  @Input() deviceType: string = '';
  @Input() rackName: string = '';

  @Output() rackNameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() navigateToRacks: EventEmitter<void> = new EventEmitter<void>();

  goRacks() {
    this.router.navigate(['red/racks']);
  }

  onRackChange(value: string): void {
    this.rackNameChange.emit(value);
  }

}
