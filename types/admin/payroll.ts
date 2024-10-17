export enum PersonType {
  INFLUENCER = "Influencer",
  BRAND = "Brand",
}
export enum EmploymentType {
  FULL_TIME = "FULL_TIME",
  INTERN = "INTERN",
}

export type Payroll = {
  id: string;
  //   employeeProfile: IEmployeeProfile;
  basic: number;
  hra: number;
  others: number;
  ctc: number;
  employmentType: EmploymentType;
  salaryMonth: number;
  tds: number;
  incentive: number;
  workingDays: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export const PAYROLL_TABLE_PAGE_LIMIT = 5;
