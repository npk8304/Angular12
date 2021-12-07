import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectDetails } from "../models/project.model";



@Injectable({
    providedIn: 'root'
})
export class ProjectDetailsService {
    baseUrl: string = "http://localhost:3000/project/";


    constructor(private httpClient: HttpClient) {

    }

    getProjectDetails(): Observable<ProjectDetails[]> {
        return this.httpClient.get<ProjectDetails[]>(this.baseUrl);
    }


    createProject(projectDetails: ProjectDetails) {
        return this.httpClient.post(this.baseUrl, projectDetails);
    }
    deleteProjectDetails(id?: number) {
        this.baseUrl = "http://localhost:3000/project/";
        return this.httpClient.delete<ProjectDetails[]>(this.baseUrl + id);
    }
}