import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost:3000/users/";

  constructor(private httpClient: HttpClient) { }

  getusers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>('http://localhost:3000/users'); 
    }

}
