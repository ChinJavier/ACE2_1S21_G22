import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfile2Component } from './list-profile2.component';

describe('ListProfile2Component', () => {
  let component: ListProfile2Component;
  let fixture: ComponentFixture<ListProfile2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProfile2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
