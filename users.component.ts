import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { AllUsers } from '../models/allusers';
import { SelectedList } from '../models/selected.model';
import { UsersGroup } from '../models/usergroup.model';
import { Users } from '../models/users.model';
import { AllusersService } from '../services/allusers.service';
import { UserService } from '../services/user.service';
import { UsergroupService } from '../services/usergroup.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  FormDemo: any = FormGroup;
  usergrouplst: UsersGroup[] = [];
  userlst: Users[] = [];
  allusereslst: AllUsers[] = [];
  selectedUsergGroupId: number = 0;
  selectedMsg: string = "";
  isSubmitted: boolean = false;
  searchText: string = "";



  filterusers: Users[] = [];

  selectedAll: any;
  selectedCount: number = 0;
  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: SelectedList[] = [];


  constructor(private fb: FormBuilder, private usergroupservice: UsergroupService,
    private userservice: UserService, private alluseres: AllusersService) { }

  getusers(e: any) {
    this.selectedUsergGroupId = e.target.value;
    this.filterusers = this.userlst.filter((d) => d.usergroupid == this.selectedUsergGroupId);
    this.dropdownList = this.userlst.filter((d) => d.usergroupid == this.selectedUsergGroupId);
  }

  ngOnInit(): void {
    this.FormDemo = this.fb.group({
      id: [''],
      UserGroupid: ['', [Validators.required]],
      UserGroupName: ['', [Validators.required]],
      // Userid: ['', [Validators.required]],
      // UserName: ['', [Validators.required]],
      UsersNew: ['', [Validators.required]],
    });

    this.usergroupservice.getusergroup()
      .subscribe((data: UsersGroup[]) => {
        this.usergrouplst = data;
      });


    this.getallusers();
    this.getuseres();
    this.getSelectedMsg();

    this.dropdownList = [
      // { id: 1, Name: 'Item1' },
      // { id: 2, Name: 'Item2' },
      // { id: 3, Name: 'Item3' },
      // { id: 4, Name: 'Item4' },
      // { id: 5, Name: 'Item5' }
    ];
    this.dropdownSettings = {
      idField: 'id',
      textField: 'Name',
    };
    this.selectedItems = [
      // { id: 3, text: 'Item3' },
      // { id: 4, text: 'Item4' }
    ];

  }

  get form() {
    return this.FormDemo.controls;
  }

  OnSubmit() {
    this.isSubmitted = true;

    var res = this.dropdownList.filter((a: any) => a.idField == true);


    const ssss = this.FormDemo.controls['UsersNew'].value;
    console.log('ssss');
    console.log(ssss);
    console.log('                     ');
    console.log('                     ');

    const selectedUserGroupName = this.usergrouplst.filter((a) => a.id == this.FormDemo.controls['UserGroupid']?.value);



    this.FormDemo.controls["UserGroupName"].patchValue(selectedUserGroupName[0].Name);
    // this.FormDemo.controls["UserName"].patchValue(selecteduserName[0].Name);


    console.log(this.alluseres.createuseres(this.FormDemo.value, ssss));
    // this.alluseres.createuseres(this.FormDemo.value, ssss)
    //   .subscribe(data => {
    //     this.getuseres();

    //   });

    this.alluseres.createuseres(this.FormDemo.value, ssss).subscribe(() => {
      this.getuseres();

    });


    setTimeout(() => {
      this.getuseres();
    }, 1500);

  }

  getallusers() {
    this.userservice.getusers()
      .subscribe((data: Users[]) => {
        this.userlst = data;
      })
  }

  getuseres() {
    this.alluseres.getuseres()
      .subscribe((data: AllUsers[]) => {
        this.allusereslst = data;
        this.getSelectedMsg();
      })
  }

  selectAll() {
    for (var i = 0; i < this.allusereslst.length; i++) {
      this.allusereslst[i].isChecked = this.selectedAll;
    }
    this.getSelectedMsg();
  }
  checkIfAllSelected() {
    this.selectedAll = this.allusereslst.every(function (item: any) {
      return item.isChecked == true;
    })

    this.getSelectedMsg();
  }

  getSelectedMsg() {

    let cnts = 0;
    for (var i = 0; i < this.allusereslst.length; i++) {
      if (this.allusereslst[i].isChecked) {
        cnts++;
      }
    }
    this.selectedCount = cnts;

    this.selectedMsg = this.selectedCount > 0 ? ("Select " + this.selectedCount + " | " + this.allusereslst?.length + " Total ") :
      "Total : " + this.allusereslst?.length;
  }

  OnDelete(): void {

    var ids = [];
    for (var i = 0; i < this.allusereslst.length; i++) {
      if (this.allusereslst[i].isChecked) {
        ids.push(this.allusereslst[i].id);
      }
    }

    ids.forEach(id => {
      this.alluseres.deleteuseres(id)
        .subscribe(data => {

        })
    });

    this.getuseres();
  }

}
