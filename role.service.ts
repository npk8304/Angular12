import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../models/role.model';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    baseUrl: string = "http://localhost:3000/roles/";

    constructor(private httpClient: HttpClient) { }

    getRoles(): Observable<Roles[]> { 
        // var lstRoles = this.httpClient.get<Roles[]>('http://localhost:3000/Roles');
        // return lstRoles.filter((a) => a.role == "admin")

        return this.httpClient.get<Roles[]>('http://localhost:3000/Roles'); 

    }

}
