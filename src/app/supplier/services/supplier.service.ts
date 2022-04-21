import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";
import { Address, CepSearch } from "../models/address";
import { Supplier } from "../models/supplier";

@Injectable()
export class SupplierService extends BaseService {
    
    constructor(
        private http: HttpClient
    ) {
        super();
    }

    searchCep(cep: string): Observable<CepSearch> {
        return this.http
            .get<CepSearch>(`https://viacep.com.br/ws/${cep}/json`)
            .pipe(catchError(super.serviceError));
    }

    getAll(): Observable<Supplier[]>{
        return this.http
            .get<Supplier[]>(this.url + '/fornecedores', this.getAuthHeaderJson())
            .pipe(
                catchError(this.serviceError)
            );
    }

    getById(id: string): Observable<Supplier> {
        return this.http
            .get<Supplier>(this.url + '/fornecedores/' + id, super.getAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    addSupplier(supplier: Supplier): Observable<Supplier> {
        return this.http
            .post(this.url + '/fornecedores', supplier, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    updateSupplier(supplier: Supplier): Observable<Supplier> {
        return this.http
            .put(this.url + '/fornecedores', supplier, super.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    removeSupplier(id: string): Observable<Supplier>{
        return this.http
            .delete(this.url + '/fornecedores/' + id, super.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    updateAddress(address: Address): Observable<Address> {
        return this.http
            .put(this.url + '/fornecedores/endereco/' + address.id, address, super.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
}