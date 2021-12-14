import { HttpClient, } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule,By } from '@angular/platform-browser';
import { async } from 'rxjs';
import { ProjectDetailsService } from 'src/app/services/projectdetails.service';

import { ProjectviewComponent } from './projectview.component';

xdescribe('ProjectviewComponent', async () => {
  let comp: ProjectviewComponent;
  let fixture: ComponentFixture<ProjectviewComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectviewComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClient
      ],
      providers: [ProjectDetailsService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProjectviewComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should be created', () => {
    const service: ProjectDetailsService = TestBed.get(ProjectDetailsService);
    expect(service).toBeTruthy();
   });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectviewComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
  // it(`from should be invalid`,(()=> {
  //   component.FormDemo.controls['name'].setValue('');
  //   expect(component.FormDemo.valid).toBeFalse();
  // }))
});
