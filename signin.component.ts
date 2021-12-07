import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loginroles } from '../models/loginrole.model';
import { LoginroleService } from '../services/loginroles.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isSubmitted:boolean =false;
  lgnForm: any = FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private loginservie: LoginroleService) {
  }

  get form() {
    return this.lgnForm.controls;
  }
  
  ngOnInit(): void {
    this.lgnForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  }
  onSubmit() {

    this.loading = true;
    console.log(this.lgnForm)
    this.isSubmitted = true;
    if (this.lgnForm.invalid) {
      // alert('false')
      return;
    }
    else {
      localStorage.setItem('token',
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiSldUIFJ1bGVzISIsImlhdCI6MTQ1OTQ0ODExOSwiZXhwIjoxNDU5NDU0NTE5fQ.-yIVBD5b73C75osbmwwshQNRC7frWUYrqaTjTpza2y4")


      this.loginservie.getLoginroles().subscribe((data: Loginroles[]) => {
        var lstrolesTemp = data.filter((a) => a.username === this.lgnForm.value.email);

        console.log(lstrolesTemp);
        if (lstrolesTemp && lstrolesTemp.length > 0) {
          lstrolesTemp = lstrolesTemp.filter((a) => a.password === this.lgnForm.value.password);
        }

        console.log(lstrolesTemp);

        if (lstrolesTemp && lstrolesTemp.length > 0) {
          if (lstrolesTemp[0].role === "Admin") {
            localStorage.setItem('userType', 'Admin')
          }
          else if (lstrolesTemp[0].role === "DomainExpert") {
            localStorage.setItem('userType', 'DomainExpert')
          }
          else if (lstrolesTemp[0].role === "LeadArtist") {
            localStorage.setItem('userType', 'LeadArtist')
          }
          else if (lstrolesTemp[0].role === "Lead") {
            localStorage.setItem('userType', 'Lead')
          }
          else {
            localStorage.setItem('userType', 'User')
          }
        }

        console.log(localStorage.getItem('userType'));

        this.router.navigate(['/dash-board']) 

      })

      // this.lgnForm.value.email == "admin@gmail.com" ?
      //   (localStorage.setItem('userType', 'admin')) :
      //   (localStorage.setItem('userType', 'employee'));



    }


  }

}
