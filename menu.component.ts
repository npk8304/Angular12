import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  roleName!: any;

  constructor() { }

  ngOnInit(): void {
    this.roleName = localStorage?.getItem('userType'); 
  }

}
