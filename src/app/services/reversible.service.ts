import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class ReversibleService extends ApiService {
  constructor(
    protected http: HttpClient,
    protected spinner: NgxSpinnerService,
  ) {
    super(http, spinner);
  }

  check(form: any, hasSpinner = true): Observable<any> {
    return new Observable(observer => {
      this.post(`${environment.APIServer}/check`, {
        number: form.number
      }, hasSpinner).subscribe(response => {
        observer.next(response);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
