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
  email: String;
  password: String;
  gender: Gender;
  role: Role;
  firstName: String;
  lastName: String;

  get displayName() {
    return this.firstName + " " + this.lastName;
  }
}
