/**
 * job model
 * Basically mimics the UserSerializer in the API.
 */
import {Company} from './company';
import {Category} from './category';

export class Categories {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface Job {
  company: Company;
  title: string;
  fromSalary: string;
  toSalary: string;
  category: Category;
  id: string;
}
