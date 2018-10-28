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
export enum Gender {
  UNKNOWN = 'unknown',
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export enum Role {
  Student = 'student',
  Company = 'company',
}

export class User {
  profileImageURL: string;
  id: number;
  email: string;
  password: string;
  gender: Gender;
  role: Role;
  firstName: string;
  lastName: string;
  access_token: string;
  socialLogin: boolean;

  get displayName() {
    return this.firstName + ' ' + this.lastName;
  }
}

export class UserCompany {
  email: string;
  password: string;
  role: Role;
  name: string;
  contactName: string;
  phoneNumber: string;
  address: string;
  city: string;
  website: string;
  access_token: string;
}
