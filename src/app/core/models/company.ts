<<<<<<< HEAD
/* Address model
 * Detailed info http://guides.spreecommerce.org/developer/addresses.html
 * Public API's http://guides.spreecommerce.org/api/addresses.html
 */

export class Company {
  id: number;
  email: string;
  name: string;
  address: string;
  city: string;
  contactName: string;
  phoneNumber: string;
  website: string;
  description: string;
  logoURL: string;
  coverURL: string;
  videoURL: string;
}

export class UpdateCompanyProfileRequest {
  id: number;
  email: string;
  name: string;
  address: string;
  city: string;
  contactName: string;
  phoneNumber: string;
  website: string;
  description: string;
}
  
