import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTempComponent } from './report-temp.component';

describe('ReportTempComponent', () => {
  let component: ReportTempComponent;
  let fixture: ComponentFixture<ReportTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
