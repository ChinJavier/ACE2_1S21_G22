import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiRhythmComponent } from './ui-rhythm.component';

describe('UiRhythmComponent', () => {
  let component: UiRhythmComponent;
  let fixture: ComponentFixture<UiRhythmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiRhythmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiRhythmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
