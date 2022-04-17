import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent implements OnInit {

  public suppliers: Supplier[];
  errorMessage: string;

  constructor(
    private toastr: ToastrService,
    private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
    this.supplierService.getAll()
      .subscribe(suppliers => {
        this.suppliers = suppliers

        console.log(suppliers)
      },
        error => this.errorToastr(error));
  }

  errorToastr(message: any){
    this.toastr.error(JSON.stringify(message));
  }

}
