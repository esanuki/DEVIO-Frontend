import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSupplierComponent } from './details-supplier.component';

describe('DetailsSupplierComponent', () => {
  let component: DetailsSupplierComponent;
  let fixture: ComponentFixture<DetailsSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
