import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleTopPanelComponent } from './middle-top-panel.component';

describe('MiddleTopPanelComponent', () => {
  let component: MiddleTopPanelComponent;
  let fixture: ComponentFixture<MiddleTopPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleTopPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleTopPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
