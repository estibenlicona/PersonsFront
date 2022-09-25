import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Person } from 'src/app/shared/models/person';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { PersonService } from 'src/app/shared/services/person.service';
import { ListPersonResponse } from 'src/app/shared/responses/person/list.response';
import { MatDialog } from '@angular/material/dialog';
import { FormPersonDialog } from '../forms/form-person/form-person.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from 'src/app/shared/responses/api.response';
import { ScopeService } from 'src/app/shared/services/scope.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit, AfterViewInit  {

  scopes!: Array<string>;

  person: Person = new Person();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype, { pageSize: 10 });

  constructor(private _personService: PersonService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _scopeService: ScopeService) {

  }

  ngOnInit(): void {
    this.ListInTable();
    this._scopeService.GetScopes.subscribe(resp => {
      this.scopes = resp;
    })
  }

  checkScope(name: string): boolean
  {
    return this.scopes.includes(name);
  }
  displayedColumns: string[] = ['document', 'firstName', 'lastName', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Person>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogEdit(person: Person){
    this.person = person;
    this.openDialog(true);
  }

  openDialog(isUpdate: boolean = false): void {
    const dialogRef = this.dialog.open(FormPersonDialog, {
      width: '350px',
      data: { isUpdate, person: this.person },
    });

    dialogRef.afterClosed().subscribe((result: ApiResponse) => {
      this.showSnackBar(result.message);
      this.ListInTable();
    });
  }

  showSnackBar(message: string){
    this._snackBar.open(message, 'OK', {
        duration: 2000,
        panelClass: ['blue-snackbar']
    });
  }

  ListInTable(){
    this._personService.List(this.paginator.pageSize, this.paginator.pageIndex).subscribe((resp: ListPersonResponse) => {
      this.dataSource = new MatTableDataSource<Person>(resp.persons);
      this.length = resp.count;
    })
  }

  onDelete(id: string){
    this._personService.Delete(id).subscribe((result: ApiResponse) => {
      this.showSnackBar(result.message);
      this.ListInTable();
    });
  }

  pageEvent(){
    this.ListInTable();
  }

}
