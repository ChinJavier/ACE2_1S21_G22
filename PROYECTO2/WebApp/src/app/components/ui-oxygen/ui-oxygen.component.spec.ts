import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiOxygenComponent } from './ui-oxygen.component';

describe('UiOxygenComponent', () => {
  let component: UiOxygenComponent;
  let fixture: ComponentFixture<UiOxygenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiOxygenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiOxygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
