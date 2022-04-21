import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-remove-supplier',
  templateUrl: './remove-supplier.component.html',
  styleUrls: ['./remove-supplier.component.css']
})
export class RemoveSupplierComponent implements OnInit {

  supplier: Supplier;
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.supplier = this.route.snapshot.data['supplier'];
  }

  removeSupplier() {
    this.spinner.show();

    this.supplierService.removeSupplier(this.supplier.id)
      .subscribe(
        data =>{
          this.spinner.hide();
          this.successRemove(data);
        },
        error => {
          this.spinner.hide(); 
          this.fail(error);
        }
      );
  }

  successRemove(event: any){
    const toast = this.toastr.success('Fornecedor excluido com sucesso!', 'HAHAHA');
    if (toast){
      toast.onHidden.subscribe(() => {
        this.router.navigate(['supplier/list-supplier']);
      })
    }
  }

  fail(error: any) {
    this.errors = error.error.errors;
    this.toastr.error('Houve um erro', 'Danger');
  }

}
