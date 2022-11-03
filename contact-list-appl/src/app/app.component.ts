import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contacts } from './model/contact';
import { ContactListServiceService } from './service/contact-list-service.service';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  displayedColumns: string[] = ['person_id', 'person_name', 'person_image'];
  dataSource: any;
  contactListData:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;


  constructor(private service: ContactListServiceService, private sanitizer: DomSanitizer){
    
  }
  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(){
    this.service.getContactList().subscribe(result =>{
      this.contactListData = result;

      this.dataSource = new MatTableDataSource<Contacts>(this.contactListData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })
  }

  filterChange(event:Event){

    const fieldValue = (event.target as HTMLInputElement ).value;
    this.dataSource.filter =fieldValue;

  }

  photoURL(url:any){

    return this.sanitizer.bypassSecurityTrustUrl(url);

  }

}
