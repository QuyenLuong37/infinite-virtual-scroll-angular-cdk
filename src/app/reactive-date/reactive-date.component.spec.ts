import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveDateComponent } from './reactive-date.component';

describe('ReactiveDateComponent', () => {
  let component: ReactiveDateComponent;
  let fixture: ComponentFixture<ReactiveDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
