
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as clone from 'clone';
import { Observable, Subject } from 'rxjs';

export enum RequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Options = 'OPTIONS',
    Head = 'HEAD',
    Patch = 'PATCH',
}

export class OptionsRequest {
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    observe?: 'body';
    params?: HttpParams | { [param: string]: string | string[]; };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class Proxy {

    public http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    executePost(relativeUrl: string, dataInput: any, withCredentials: boolean = false): Subject<any> {
      let dataClon: any;
      dataClon =  clone(dataInput);
      const request = this.createRequest(relativeUrl, RequestMethod.Post, dataClon, withCredentials, '');
      request.headers.append('Content-Type', 'application/json');
      const observable = this.http.request(request).pipe(map(this.mapResponse.bind(this, request.url, relativeUrl)));
      let subject: Subject<any>;
      subject = new Subject();
      observable.subscribe(((data: any) => {
        subject.next(data);
      }).bind(this), ((response: any) => {
        if (response.status === 500) {
        } else if (response.status === 401) {
          subject.complete();
        } else {
          throw response;
        }
      }).bind(this));

      return subject;
    }

    executeGet(relativeUrl: string, parameters: string, withCredentials: boolean = false): Subject<any> {
      const request = this.createRequest(relativeUrl, RequestMethod.Get, {}, withCredentials, parameters);
      request.headers.append('Content-Type', 'application/json');

      let subject: Subject<any>;
      subject = new Subject();
      const observable = this.http.request(request).pipe(map(this.mapResponse.bind(this, request.url, relativeUrl)));
      observable.subscribe(((data: any) => {
        subject.next(data);
      }).bind(this), ((response: any) => {
        if (response.status === 500) {
        } else if (response.status === 401) {
          subject.complete();
        } else {
          throw response;
        }
      }).bind(this));

      return subject;
    }

    executeDelete(relativeUrl: string, parameters: string, withCredentials: boolean = false) {
      const request = this.createRequest(relativeUrl, RequestMethod.Delete, {}, withCredentials, parameters);
      request.headers.append('Content-Type', 'application/json');

      let subject: Subject<any>;
      subject = new Subject();
      const observable = this.http.request(request).pipe(map(this.mapResponse.bind(this, request.url, relativeUrl)));
      observable.subscribe(((data: any) => {
        subject.next(data);
      }).bind(this), ((response: any) => {
        if (response.status === 500) {
        } else if (response.status === 401) {
          subject.complete();
        } else {
          throw response;
        }
      }).bind(this));

      return subject;
    }

    executePut(relativeUrl: string, dataInput: any, parameters: string, withCredentials: boolean = false): Subject<any> {
      const request = this.createRequest(relativeUrl, RequestMethod.Put, dataInput, withCredentials, parameters);
      request.headers.append('Content-Type', 'application/json');

      let subject: Subject<any>;
      subject = new Subject();
      const observable = this.http.request(request).pipe(map(this.mapResponse.bind(this, request.url, relativeUrl)));
      observable.subscribe(((data: any) => {
        subject.next(data);
      }).bind(this), ((response: any) => {
        if (response.status === 500) {
        } else if (response.status === 401) {
          subject.complete();
        } else {
          throw response;
        }
      }).bind(this));

      return subject;
    }

    protected mapResponse(url: string, relativeUrl: string, response: Response) {
      let result: any = null;
      if (response.ok) {
        if (response.headers.get('Content-Type').indexOf('application/json') > -1) {
          result = response.body;
        }
        return result;
      }
    }

    protected createRequest(relativeUrl: string, method: string, body: any, withCredential: boolean, params: string): HttpRequest<any> {
      const url = environment.webApiBaseUrl + relativeUrl;
      const search = '';
      const  parametters = new  HttpParams({fromString: params});
      const result = new HttpRequest<any>(
        method,
        url,
        body,
        {
          responseType: 'json',
          params: parametters,
          withCredentials: withCredential
        });
      this.addRequiredHeadersToRequest(result);
      return result;
    }

    protected addRequiredHeadersToRequest(request: HttpRequest<any>) {
      const authenticationToken: string = this.getAuthenticationToken();
      if (authenticationToken) {
        request.headers.append('X-Auth-Token', authenticationToken);
      }
    }

    protected getAuthenticationToken(): string {
        return localStorage.getItem('authToken');
    }

}
