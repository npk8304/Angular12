import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersGroup } from '../models/usergroup.model';

@Injectable({
  providedIn: 'root'
})
export class UsergroupService {
  baseUrl: string = "http://localhost:3000/usergroup/";

  constructor(private httpClient: HttpClient) { }

  getusergroup(): Observable<UsersGroup[]> {
    return this.httpClient.get<UsersGroup[]>('http://localhost:3000/usergroup'); 
    }
}
