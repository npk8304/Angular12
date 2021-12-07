import { Component, OnInit } from '@angular/core';
import { Roles } from '../models/role.model';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  lstRoles: Roles[] = [];
  roleName!: any;
  constructor(private _roleserive: RoleService,) { }

  ngOnInit(): void {
    this.roleName = localStorage?.getItem('userType'); 
  
    console.log( ' AAAAAAAAAAAA ' + localStorage.getItem('userType'))

    this._roleserive.getRoles()
      .subscribe((data: Roles[]) => { 
        var lstrolesTemp = data.filter((a) => a.role == localStorage.getItem('userType'));
        
        console.log(lstrolesTemp)
        this.lstRoles = lstrolesTemp;
        console.log(this.lstRoles)

      })
  }

}
