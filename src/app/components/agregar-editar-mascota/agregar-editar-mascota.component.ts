import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interface/mascota';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent {
  loading = false
  former: FormGroup
  params: any;

  constructor(private router: Router, private _snackBar: MatSnackBar, private fb: FormBuilder, activeRoute: ActivatedRoute, private _petService: MascotaService) {
    this.former = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: [''],
      peso: ['', Validators.required],
      edad: ['', Validators.required],
    });
    activeRoute.params.subscribe(p => this.params = p);
  }
  ngOnInit() {
    this.getPetIfExist()
  }
  getPetIfExist() {
    const { id } = this.params
    if (id) {
      this._petService.getPet(id).subscribe(data => {
        const { nombre, raza, edad, peso, color } = data;
        this.former.setValue({ nombre, raza, edad, peso, color })
      })
    }
  }
  savePet() {
    if (this.former.status == 'VALID') {
      this.loading = true
      const { value } = this.former
      const mascota: Mascota = { ...value }
      const { id } = this.params
      if (id) {
        this._petService.updatePet(id, mascota).subscribe(data => {
          this.getPetIfExist()
          this.loading = false
          this._snackBar.open(`Mascota ${mascota.nombre}`, 'Actualizada', {
            duration: 1000,
            horizontalPosition: 'right',
          });
          this.router.navigate(['/mascotas'])
        })
      } else {
        this._petService.createPet(mascota).subscribe(data => {
          this.loading = false
          this._snackBar.open(`Mascota ${mascota.nombre}`, 'Creada', {
            duration: 1000,
            horizontalPosition: 'right',
          });
          this.router.navigate(['/mascotas'])
        })
      }
    }
  }
}
