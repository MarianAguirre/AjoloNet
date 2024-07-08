import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-vlans',
  templateUrl: './dynamic-vlans.component.html',
  styleUrls: ['./dynamic-vlans.component.css']
})
export class DynamicVlansComponent implements OnInit {
  vlanForm: FormGroup;

  @Output() vlansChange = new EventEmitter<{ vlan_id: number, vlan_name: string }[]>();

  constructor(private fb: FormBuilder) {
    this.vlanForm = this.fb.group({
      vlans: this.fb.array([])  // Inicializa el FormArray vacío
    });
  }

  ngOnInit(): void {
    this.addVlan(); // Añadir un campo VLAN inicial
    this.vlanForm.valueChanges.subscribe(value => {
      this.vlansChange.emit(value.vlans);
    });
  }

  get vlans(): FormArray {
    return this.vlanForm.get('vlans') as FormArray;
  }

  addVlan(): void {
    const vlanGroup = this.fb.group({
      vlan_id: ['', Validators.required],  // Campo para ID de VLAN
      vlan_name: ['', Validators.required] // Campo para nombre de VLAN
    });

    this.vlans.push(vlanGroup);
  }

  removeVlan(index: number): void {
    this.vlans.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.vlanForm.value);
    this.vlansChange.emit(this.vlanForm.value.vlans);
  }
}
