import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';; 
import { DashBoardComponent } from './dash-board/dash-board.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { NewprojectComponent } from './newproject/newproject.component';
import { ProjectDetailsService } from './services/projectdetails.service';
import { Screen4Component } from './screen4/screen4.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FilterPipe } from './custompipes/filter.pipe';    
import { ProjectviewComponent } from './components/projectview/projectview.component';


const appRoutes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'singin', component: SigninComponent, canActivate: [AuthGuard]  },
  { path: 'dash-board', component: DashBoardComponent,canActivate:[RoleGuard] },
  { path: 'project', component: ProjectviewComponent,canActivate:[RoleGuard] },
  { path: 'screen4',component:Screen4Component},
  { path:  'user',component:UsersComponent, canActivate: [AuthGuard]}

]
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ProjectviewComponent,
    DashBoardComponent,
    NewprojectComponent,
    Screen4Component,
    MenuComponent,
    UsersComponent,FilterPipe 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, 
    RouterModule.forRoot(appRoutes),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [ProjectDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
