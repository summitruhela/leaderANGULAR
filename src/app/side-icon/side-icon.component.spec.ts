import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideIconComponent } from './side-icon.component';

describe('SideIconComponent', () => {
  let component: SideIconComponent;
  let fixture: ComponentFixture<SideIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
