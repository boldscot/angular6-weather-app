import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleBottomPanelComponent } from './middle-bottom-panel.component';

describe('MiddleBottomPanelComponent', () => {
  let component: MiddleBottomPanelComponent;
  let fixture: ComponentFixture<MiddleBottomPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleBottomPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleBottomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
