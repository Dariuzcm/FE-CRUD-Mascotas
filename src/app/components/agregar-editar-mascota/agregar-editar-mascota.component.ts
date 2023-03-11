import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/interface/mascota';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent {
  loading = false
  former: FormGroup

  constructor(private fb: FormBuilder) {
    this.former = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      peso: ['', Validators.required],
      edad: ['', Validators.required],
    })
  }

  savePet() {
    if (this.former.status == 'VALID') {
      const {value} = this.former
      let mascota: Mascota = {...value}
      console.log(mascota)
    }
  }
}
