import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/interface/mascota';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent {
  constructor(private _petService: MascotaService, activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe(data => this.params = data)
  }
  params: any;
  dataSource: Mascota = {
    nombre: '',
    edad: 0,
    raza: '',
    color: '',
    peso: 0
  };
  loading: Boolean = false;

  ngOnInit(): void {
    this.getPets()
  }

  getPets() {
    this.loading = true;
    const { id } = this.params
    this._petService.getPet(id).subscribe(data => {
      this.loading = false;
      this.dataSource = data
    })
  }
}
