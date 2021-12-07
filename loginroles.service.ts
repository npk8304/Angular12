import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loginroles } from '../models/loginrole.model';


@Injectable({
    providedIn: 'root'
})
export class LoginroleService {
    baseUrl: string = "http://localhost:3000/roles/";

    constructor(private httpClient: HttpClient) { }

    getLoginroles(): Observable<Loginroles[]> {
    return this.httpClient.get<Loginroles[]>('http://localhost:3000/Loginroles'); 
    }

}
