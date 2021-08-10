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

import { Gateway } from '../models/gateway';
import { GatewayDao } from '../models/gateway-dao';
import { PageSort } from '../models/page-sort';
import { Peripheral } from '../models/peripheral';
import { PeripheralDao } from '../models/peripheral-dao';

@Injectable({
  providedIn: 'root',
})
export class GatewayControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addPeripheral
   */
  static readonly AddPeripheralPath = '/api/gateway/peripheral/add/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPeripheral()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPeripheral$Response(params: {
    id: number;
    body: PeripheralDao
  }): Observable<StrictHttpResponse<Peripheral>> {

    const rb = new RequestBuilder(this.rootUrl, GatewayControllerService.AddPeripheralPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `addPeripheral$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPeripheral(params: {
    id: number;
    body: PeripheralDao
  }): Observable<Peripheral> {

    return this.addPeripheral$Response(params).pipe(
      map((r: StrictHttpResponse<Peripheral>) => r.body as Peripheral)
    );
  }

  /**
   * Path part for operation createGateway
   */
  static readonly CreateGatewayPath = '/api/gateway/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createGateway()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createGateway$Response(params: {
    body: GatewayDao
  }): Observable<StrictHttpResponse<Gateway>> {

    const rb = new RequestBuilder(this.rootUrl, GatewayControllerService.CreateGatewayPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Gateway>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createGateway$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createGateway(params: {
    body: GatewayDao
  }): Observable<Gateway> {

    return this.createGateway$Response(params).pipe(
      map((r: StrictHttpResponse<Gateway>) => r.body as Gateway)
    );
  }

  /**
   * Path part for operation updateGateway
   */
  static readonly UpdateGatewayPath = '/api/gateway/update/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateGateway()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGateway$Response(params: {
    id: number;
    body: GatewayDao
  }): Observable<StrictHttpResponse<Gateway>> {

    const rb = new RequestBuilder(this.rootUrl, GatewayControllerService.UpdateGatewayPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Gateway>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateGateway$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGateway(params: {
    id: number;
    body: GatewayDao
  }): Observable<Gateway> {

    return this.updateGateway$Response(params).pipe(
      map((r: StrictHttpResponse<Gateway>) => r.body as Gateway)
    );
  }

  /**
   * Path part for operation getPeripherals
   */
  static readonly GetPeripheralsPath = '/api/gateway/peripherals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPeripherals()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPeripherals$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Array<Peripheral>>> {

    const rb = new RequestBuilder(this.rootUrl, GatewayControllerService.GetPeripheralsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `getPeripherals$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPeripherals(params: {
    id: number;
  }): Observable<Array<Peripheral>> {

    return this.getPeripherals$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Peripheral>>) => r.body as Array<Peripheral>)
    );
  }

  /**
   * Path part for operation getGatewaysPaged
   */
  static readonly GetGatewaysPagedPath = '/api/gateway/paged';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGatewaysPaged()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGatewaysPaged$Response(params: {
    options: PageSort;
  }): Observable<StrictHttpResponse<Array<Gateway>>> {

    const rb = new RequestBuilder(this.rootUrl, GatewayControllerService.GetGatewaysPagedPath, 'get');
    if (params) {
      rb.query('options', params.options, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Gateway>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGatewaysPaged$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGatewaysPaged(params: {
    options: PageSort;
  }): Observable<Array<Gateway>> {

    return this.getGatewaysPaged$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Gateway>>) => r.body as Array<Gateway>)
    );
  }

  /**
   * Path part for operation findGatewayById
   */
  static readonly FindGatewayByIdPath = '/api/gateway/get/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findGatewayById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findGatewayById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Gateway>> {

    const rb = new RequestBuilder(this.rootUrl, GatewayControllerService.FindGatewayByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Gateway>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findGatewayById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findGatewayById(params: {
    id: number;
  }): Observable<Gateway> {

    return this.findGatewayById$Response(params).pipe(
      map((r: StrictHttpResponse<Gateway>) => r.body as Gateway)
    );
  }

  /**
   * Path part for operation gatewayCount
   */
  static readonly GatewayCountPath = '/api/gateway/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gatewayCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  gatewayCount$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, GatewayControllerService.GatewayCountPath, 'get');
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
   * To access the full response (for headers, for example), `gatewayCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  gatewayCount(params?: {
  }): Observable<number> {

    return this.gatewayCount$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation deleteGateway
   */
  static readonly DeleteGatewayPath = '/api/gateway/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteGateway()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGateway$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Gateway>> {

    const rb = new RequestBuilder(this.rootUrl, GatewayControllerService.DeleteGatewayPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Gateway>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteGateway$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGateway(params: {
    id: number;
  }): Observable<Gateway> {

    return this.deleteGateway$Response(params).pipe(
      map((r: StrictHttpResponse<Gateway>) => r.body as Gateway)
    );
  }

}
