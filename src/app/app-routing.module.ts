import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

const routes: Routes = [
  {path: '', redirectTo: 'mascotas', pathMatch:'full'},
  {path: 'mascotas', component: ListadoMascotaComponent},
  {path: 'mascota/form', component: AgregarEditarMascotaComponent},
  {path: 'mascota/edit/:id', component: AgregarEditarMascotaComponent},
  {path: 'mascota/description/:id', component: VerMascotaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
