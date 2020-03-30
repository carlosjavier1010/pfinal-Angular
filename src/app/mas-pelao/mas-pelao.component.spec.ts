import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasPelaoComponent } from './mas-pelao.component';

describe('MasPelaoComponent', () => {
  let component: MasPelaoComponent;
  let fixture: ComponentFixture<MasPelaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasPelaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasPelaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
