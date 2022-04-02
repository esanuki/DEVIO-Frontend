import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSupplierComponent } from './remove-supplier.component';

describe('RemoveSupplierComponent', () => {
  let component: RemoveSupplierComponent;
  let fixture: ComponentFixture<RemoveSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
