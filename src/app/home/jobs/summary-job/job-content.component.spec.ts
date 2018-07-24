import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobContentComponent } from './job-content.component';

describe('JobContentComponent', () => {
  let component: JobContentComponent;
  let fixture: ComponentFixture<JobContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
