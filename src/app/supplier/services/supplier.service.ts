import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";
import { CepSearch } from "../models/address";
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

    addSupplier(supplier: Supplier): Observable<Supplier> {
        return this.http
            .post(this.url + '/fornecedores', supplier, this.getAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
}