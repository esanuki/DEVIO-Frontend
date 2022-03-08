import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from 'rxjs/operators'
import { BaseService } from "src/app/shared/services/base.service";
import { User } from "../models/user";

@Injectable()
export class AccountService extends BaseService {

    constructor(
        private http: HttpClient
    ) { 
        super();
        this.url = this.url + '/auth/'; 
    }

    register(user: User) {
        return this.http
            .post(this.url + 'nova-conta', user, this.getHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    login(user: User) {
        return this.http
            .post(this.url + 'login', user, this.getHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
}