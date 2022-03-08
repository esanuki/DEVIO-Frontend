import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment as env} from 'src/environments/environment';
import { LocalStorageUtil } from '../utils/local-storage-util';

export abstract class BaseService {
    
    protected url: string = env.urlService;
    public LocalStorage = new LocalStorageUtil();

    protected getHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected getAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.getTokenUser()}`
            })
        };
    }

    protected extractData = (response: any) => response.data || {};

    protected serviceError(response: Response | any) {
        let customError: string[] = [];

        if (response instanceof HttpErrorResponse) {
            if (response.statusText === 'Unknown Error'){
                customError.push('Ocorreu um erro desconhecido');
                response.error.errors = customError;
            }
        }

        return throwError(response);
    }
}