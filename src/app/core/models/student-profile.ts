import { Deserializable } from "./deserializable.model";

export class BasicInfo implements Deserializable {
  jobTitle: string;
  yearsOfExperience: number;
  educationalStatus: object;

  deserialize(input: any) {
    Object.assign(this, {
      jobTitle: input.jobTitle || '',
      yearsOfExperience: input.yearsOfExperience || '',
      educationalStatus: input.educationalStatus || null
    });
    return this;
  }
}

export class PersonalInfo implements Deserializable {
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: any;
  gender: string;
  maritalStatus: string;
  country: string;
  city: string;
  currentAddress: string;

  deserialize(input: any) {
    Object.assign(this, {
      fullName: input.fullName || '',
      phoneNumber: input.phoneNumber || '',
      email: input.email || '',
      dateOfBirth: input.dateOfBirth || '',
      gender: input.gender || '',
      maritalStatus: input.maritalStatus || '',
      country: input.country || '',
      city: input.city || '',
      currentAddress: input.currentAddress || ''
    });
    return this;
  }
}
