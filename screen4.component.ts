import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen4',
  templateUrl: './screen4.component.html',
  styleUrls: ['./screen4.component.css']
})
export class Screen4Component implements OnInit {
  roleName!: any;

  constructor() { }

  ngOnInit(): void {
    this.roleName = localStorage?.getItem('userType');   
  }

}
