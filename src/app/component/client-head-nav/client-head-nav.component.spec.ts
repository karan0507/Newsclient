import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHeadNavComponent } from './client-head-nav.component';

describe('ClientHeadNavComponent', () => {
  let component: ClientHeadNavComponent;
  let fixture: ComponentFixture<ClientHeadNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientHeadNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHeadNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
