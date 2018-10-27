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

export class TimeWorkingAt implements Deserializable {
  fromMonth: string;
  toMonth: number;
  isCurrentJob: object;

  deserialize(input: any) {
    Object.assign(this, {
      fromMonth: input.fromMonth || '',
      toMonth: input.toMonth || '',
      isCurrentJob: input.toMonth === 'NOW' ? true : false
    });
    return this;
  }
}

export class WorkingExperience implements Deserializable {
  idWorking: any;
  jobTitle: string;
  company: string;
  additionalInformation: string;
  timeWorkingAt: TimeWorkingAt;

  deserialize(input: any) {
    const timeWorkingAt = new TimeWorkingAt();
    Object.assign(this, {
      idWorking: input.id || '',
      jobTitle: input.jobTitle || '',
      company: input.company || '',
      additionalInformation: input.additionalInformation || '',
      timeWorkingAt: timeWorkingAt.deserialize(input)
    });
    return this;
  }
}

export class StudyTimeAt implements Deserializable {
  fromMonth: string;
  toMonth: number;

  deserialize(input: any) {
    Object.assign(this, {
      fromMonth: input.fromMonth || '',
      toMonth: input.toMonth || ''
    });
    return this;
  }
}

export class EducationDegrees implements Deserializable {
  idEducation: number;
  university: string;
  major: string;
  degreeType: any;
  degreeClassification: any;
  additionalInformation: string;
  studyTimeAt: StudyTimeAt;

  deserialize(input: any) {
    const timeWorkingAt = new StudyTimeAt();
    Object.assign(this, {
      idEducation: input.id || '',
      university: input.university || '',
      major: input.major || '',
      degreeType: input.degreeType || '',
      degreeClassification: input.degreeClassification || '',
      additionalInformation: input.additionalInformation || '',
      studyTimeAt: timeWorkingAt.deserialize(input)
    });
    return this;
  }
}


export class Salary implements Deserializable {
  expectedSalaryFrom: number;
  expectedSalaryTo: number;
  isNegotiableSalary: boolean;

  deserialize(input: any) {
    Object.assign(this, {
      expectedSalaryFrom: input.expectedSalaryFrom || '',
      expectedSalaryTo: input.expectedSalaryTo || '',
      isNegotiableSalary: input.isNegotiableSalary || false
    });
    return this;
  }
}

export class WorkingPreference implements Deserializable {
  preferredWorkingLocation: string;
  willingToRelocate: boolean;
  jobType: any;
  careerObjectives: string;
  salaryForm: Salary;

  deserialize(input: any) {
    const salary = new Salary();
    Object.assign(this, {
      preferredWorkingLocation: input.preferredWorkingLocation || '',
      willingToRelocate: input.willingToRelocate || false,
      jobType: input.jobType || '',
      careerObjectives: input.careerObjectives || '',
      salaryForm: salary.deserialize(input)
    });
    return this;
  }
}
