import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Contacts } from '../model/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactListServiceService {
  
  apiUrl = "http://localhost:8080/get-all-contacts";

  constructor( private http :HttpClient) { 

  }

  getContactList():Observable<Contacts>{
    return this.http.get<Contacts>(this.apiUrl);

  }
}
