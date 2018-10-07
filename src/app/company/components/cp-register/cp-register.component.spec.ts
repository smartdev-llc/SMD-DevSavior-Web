import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRegisterComponent } from './cp-register.component';

describe('CpRegisterComponent', () => {
  let component: CpRegisterComponent;
  let fixture: ComponentFixture<CpRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
