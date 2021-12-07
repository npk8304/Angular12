import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllUsers } from '../models/allusers';

@Injectable({
  providedIn: 'root'
})
export class AllusersService {
  baseUrl: string = "http://localhost:3000/allusers/";

  constructor(private httpClient: HttpClient) { }

  getuseres(): Observable<AllUsers[]> {
    return this.httpClient.get<AllUsers[]>('http://localhost:3000/allusers');
  }

  createuseres(alluseres: AllUsers, selecteduser: any[]) {

    var sss: any[] = [];
    var sss1!: any;
    let cnt = 0;
    for (let i = 0; i < selecteduser.length; i++) 
    {
      console.log(selecteduser[i].product_desc); //use i instead of 0

      var ob = {
        //id?: number;
        Userid: selecteduser[i].id,
        UserName: selecteduser[i].Name,
        UserGroupid: alluseres.UserGroupid,
        UserGroupName: alluseres.UserGroupName,
        checked: false,
        isChecked: false
      }
      // alluseres[cnt].element
      console.log('                      ');
      console.log('                      ');
      console.log('    OB                  ');
      console.log(selecteduser[i]);
      console.log(selecteduser[i].id);
      console.log(selecteduser[i].Name);
      console.log(ob);
      sss1 = this.httpClient.post(this.baseUrl, ob);
      cnt++;

    }

    // selecteduser.forEach(element => {
    //   var ob = {
    //     //id?: number;
    //     Userid: element.id,
    //     UserName: element.Name,
    //     UserGroupid: alluseres.UserGroupid,
    //     UserGroupName: alluseres.UserGroupName,
    //     checked: false,
    //     isChecked: false
    //   }
    //   // alluseres[cnt].element
    //   console.log('                      ');
    //   console.log('                      ');
    //   console.log('    OB                  ');
    //   console.log(element);
    //   console.log(element.id);
    //   console.log(element.Name);
    //   console.log(ob);
    //   sss1 = this.httpClient.post(this.baseUrl, ob);
    //   cnt++;
    // });
    return sss1;
    // return this.httpClient.post(this.baseUrl, alluseres);

    // return this.httpClient.post(this.baseUrl, alluseres);;
  }

  deleteuseres(id?: number) {
    this.baseUrl = "http://localhost:3000/allusers/";
    return this.httpClient.delete<AllUsers[]>(this.baseUrl + id);
  }

}
