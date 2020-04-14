import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DissovetComponent } from './dissovet.component';

describe('DissovetComponent', () => {
  let component: DissovetComponent;
  let fixture: ComponentFixture<DissovetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DissovetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DissovetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
