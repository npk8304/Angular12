import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectDetails } from '../../models/project.model';
import { ProjectDetailsService } from '../../services/projectdetails.service';

@Component({
  selector: 'app-projectview',
  templateUrl: './projectview.component.html',
  styleUrls: ['./projectview.component.css']
})
export class ProjectviewComponent implements OnInit {
  FormDemo: any = FormGroup;
  lstProjectDtls: ProjectDetails[] = [];
  selectedMsg: string = "";
  loading: boolean = false;
  roleName!: any;
 



  constructor(private fb: FormBuilder, private projectdetailsService: ProjectDetailsService) {
    this.roleName = "";
  }
  selectedAll: any;
  selectedCount: number = 0;



  ngOnInit(): void {
    
  this.roleName = localStorage?.getItem('userType'); 
  // console.log('this.roleName')
  console.log(this.roleName)

    this.loading = true;
    this.FormDemo = this.fb.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      StatusName: ['', [Validators.required]],
    });
    setTimeout(() => {
      this.loading = false;
    }, 1500);
    this.getProject();
  }

  get form() {
    return this.FormDemo.controls;
  }

  OnSubmit() {

    console.log(this.FormDemo.value);
    console.log(this.FormDemo.value);
    this.projectdetailsService.createProject(this.FormDemo.value)
      .subscribe(data => {
        this.getProject();



      });
  }


  OnDelete(): void {

    var ids = [];
    for (var i = 0; i < this.lstProjectDtls.length; i++) {
      if (this.lstProjectDtls[i].isChecked) {
        ids.push(this.lstProjectDtls[i].id);
      }
    }

    ids.forEach(id => {
      this.projectdetailsService.deleteProjectDetails(id)
        .subscribe(data => {

        })
    });

    this.getProject();
  }

  getProject() {
    this.projectdetailsService.getProjectDetails().subscribe((data: ProjectDetails[]) => {
      this.lstProjectDtls = data;
    });

  }

  selectAll() {
    for (var i = 0; i < this.lstProjectDtls.length; i++) {
      this.lstProjectDtls[i].isChecked = this.selectedAll;
    }
    this.getSelectedMsg();
  }

  checkIfAllSelected() { 
    this.selectedAll = this.lstProjectDtls.every(function (item: any){
      return item.isChecked == true;
    })
   
    this.getSelectedMsg();
  }

  getSelectedMsg() {

    let cnts = 0;
    for (var i = 0; i < this.lstProjectDtls.length; i++) {
      if (this.lstProjectDtls[i].isChecked) {
        cnts++;
      }
    }
    this.selectedCount = cnts;

    this.selectedMsg = this.selectedCount > 0 ? ("Select " + this.selectedCount + " | " + this.lstProjectDtls?.length + " Total ") :
      "Total : " + this.lstProjectDtls?.length;
  }

}

