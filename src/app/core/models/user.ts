/**
 * User model
 * Basically mimics the UserSerializer in the API.
 */

import { Address } from './address';

export interface Authenticate {
  name?: string;
  email: string;
  password: string;
}
export enum Gender{
  UNKNOWN = "unknown",
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other"
}

export enum Role {
  Student,
  Company
}
export class User {
  email: string;
  password: string;
  gender: Gender;
  role: Role;
  firstName: string;
  lastName: string;
  access_token: string;

  get displayName() {
    return this.firstName + " " + this.lastName;
  }
}
