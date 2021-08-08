/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PageSort } from '../models/page-sort';
import { Peripheral } from '../models/peripheral';
import { PeripheralDao } from '../models/peripheral-dao';

@Injectable({
  providedIn: 'root',
})
export class PeripheralControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPeripheralsPaged
   */
  static readonly GetPeripheralsPagedPath = '/api/peripheral';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPeripheralsPaged()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPeripheralsPaged$Response(params: {
    options: PageSort;
  }): Observable<StrictHttpResponse<Array<Peripheral>>> {

    const rb = new RequestBuilder(this.rootUrl, PeripheralControllerService.GetPeripheralsPagedPath, 'get');
    if (params) {
      rb.query('options', params.options, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Peripheral>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPeripheralsPaged$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPeripheralsPaged(params: {
    options: PageSort;
  }): Observable<Array<Peripheral>> {

    return this.getPeripheralsPaged$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Peripheral>>) => r.body as Array<Peripheral>)
    );
  }

  /**
   * Path part for operation createPeripheral
   */
  static readonly CreatePeripheralPath = '/api/peripheral';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPeripheral()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPeripheral$Response(params: {
    body: PeripheralDao
  }): Observable<StrictHttpResponse<Peripheral>> {

    const rb = new RequestBuilder(this.rootUrl, PeripheralControllerService.CreatePeripheralPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Peripheral>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPeripheral$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPeripheral(params: {
    body: PeripheralDao
  }): Observable<Peripheral> {

    return this.createPeripheral$Response(params).pipe(
      map((r: StrictHttpResponse<Peripheral>) => r.body as Peripheral)
    );
  }

  /**
   * Path part for operation updatePeripheral
   */
  static readonly UpdatePeripheralPath = '/api/peripheral';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePeripheral()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePeripheral$Response(params: {
    body: Peripheral
  }): Observable<StrictHttpResponse<Peripheral>> {

    const rb = new RequestBuilder(this.rootUrl, PeripheralControllerService.UpdatePeripheralPath, 'patch');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Peripheral>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePeripheral$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePeripheral(params: {
    body: Peripheral
  }): Observable<Peripheral> {

    return this.updatePeripheral$Response(params).pipe(
      map((r: StrictHttpResponse<Peripheral>) => r.body as Peripheral)
    );
  }

  /**
   * Path part for operation findPeripheralById
   */
  static readonly FindPeripheralByIdPath = '/api/peripheral/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPeripheralById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPeripheralById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Peripheral>> {

    const rb = new RequestBuilder(this.rootUrl, PeripheralControllerService.FindPeripheralByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Peripheral>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findPeripheralById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPeripheralById(params: {
    id: number;
  }): Observable<Peripheral> {

    return this.findPeripheralById$Response(params).pipe(
      map((r: StrictHttpResponse<Peripheral>) => r.body as Peripheral)
    );
  }

  /**
   * Path part for operation deletePeripheral
   */
  static readonly DeletePeripheralPath = '/api/peripheral/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePeripheral()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePeripheral$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Peripheral>> {

    const rb = new RequestBuilder(this.rootUrl, PeripheralControllerService.DeletePeripheralPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Peripheral>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePeripheral$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePeripheral(params: {
    id: number;
  }): Observable<Peripheral> {

    return this.deletePeripheral$Response(params).pipe(
      map((r: StrictHttpResponse<Peripheral>) => r.body as Peripheral)
    );
  }

  /**
   * Path part for operation peripheralCount
   */
  static readonly PeripheralCountPath = '/api/peripheral/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `peripheralCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  peripheralCount$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, PeripheralControllerService.PeripheralCountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `peripheralCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  peripheralCount(params?: {
  }): Observable<number> {

    return this.peripheralCount$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}
