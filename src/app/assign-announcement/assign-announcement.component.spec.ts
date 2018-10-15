import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAnnouncementComponent } from './assign-announcement.component';

describe('AssignAnnouncementComponent', () => {
  let component: AssignAnnouncementComponent;
  let fixture: ComponentFixture<AssignAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
