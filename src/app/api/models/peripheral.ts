/* tslint:disable */
/* eslint-disable */
import { Gateway } from './gateway';
export interface Peripheral {
  creationDate?: number;
  gateway?: Gateway;
  id?: number;
  uid?: number;
  vendor?: string;
}
