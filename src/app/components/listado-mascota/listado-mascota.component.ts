import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interface/mascota';

const listadoMascota: Mascota[] = [
  {id: 1, nombre: 'Hydrogen1', raza: 'Golder Retriver', color:'Dorado', edad:15, peso:20},
  {id: 2, nombre: 'Hydrogen2', raza: 'Golder Retriver', color:'Dorado', edad:15, peso:20},
  {id: 3, nombre: 'Hydrogen3', raza: 'Golder Retriver', color:'Dorado', edad:15, peso:20},
  {id: 4, nombre: 'Hydrogen4', raza: 'Golder Retriver', color:'Dorado', edad:15, peso:20},
  {id: 5, nombre: 'Hydrogen5', raza: 'Golder Retriver', color:'Dorado', edad:15, peso:20},
  {id: 6, nombre: 'Hydrogen6', raza: 'Golder Retriver', color:'Dorado', edad:15, peso:20},
  {id: 7, nombre: 'Hydrogen7', raza: 'Golder Retriver', color:'Dorado', edad:20, peso:20},
  {id: 8, nombre: 'Hydrogen8', raza: 'Golder Retriver', color:'Dorado', edad:25, peso:20},
  {id: 9, nombre: 'Hydrogen9', raza: 'Golder Retriver', color:'Dorado', edad:45, peso:20},
  {id: 10, nombre: 'Hydrogen10', raza: 'Golder Retriver', color:'Dorado', edad:55, peso:20},
];

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements AfterViewInit  {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  loading: boolean = false
  displayedColumns: string[] = ["nombre", "edad", "raza", "color", "peso", "acciones"];
  dataSource = new MatTableDataSource<Mascota>(listadoMascota);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  length = listadoMascota.length;
  pageSize = 5;
  pageIndex = 0;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
  destroyPet(petId: number) {
    this.loading=true
    setTimeout(()=>{
      this.loading=false
      let pet = listadoMascota.find( element => element.id == petId)
      this._snackBar.open(`Eliminando Mascota ${pet?.nombre}`,'warning',{
        duration: 1000,
        horizontalPosition: 'right',
      })
    }, 1000)
  }
}
