import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOxigenoComponent } from './report-oxigeno.component';

describe('ReportOxigenoComponent', () => {
  let component: ReportOxigenoComponent;
  let fixture: ComponentFixture<ReportOxigenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOxigenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOxigenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
