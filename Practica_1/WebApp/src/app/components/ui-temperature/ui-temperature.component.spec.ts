import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTemperatureComponent } from './ui-temperature.component';

describe('UiTemperatureComponent', () => {
  let component: UiTemperatureComponent;
  let fixture: ComponentFixture<UiTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTemperatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
