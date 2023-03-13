import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interface/mascota';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements AfterViewInit {
  constructor(private _snackBar: MatSnackBar, private _petService: MascotaService) {

  }
  ngOnInit(): void {
    this.getPets()
  }

  getPets() {
    this._petService.getMascotas().subscribe(data => {
      this.dataSource.data = data
    })
  }

  loading: boolean = false
  displayedColumns: string[] = ["nombre", "edad", "raza", "color", "peso", "acciones"];
  dataSource = new MatTableDataSource<Mascota>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  length = this.dataSource.data.length;
  pageSize = 5;
  pageIndex = 0;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = this.dataSource.data.length
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
    this.loading = true
    const pet = this.dataSource.data.find(item => item.id === petId)
    this._petService.deletePet(petId).subscribe( _ => {
      this._snackBar.open(`Mascota ${pet?.nombre}`, 'Eliminando', {
        duration: 1000,
        horizontalPosition: 'right',
      });
      this.loading=false;
      this.getPets();
    })
  }
}
