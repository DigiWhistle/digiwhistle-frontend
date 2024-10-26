export enum EmploymentType {
  FULL_TIME = "Full Time",
  INTERNSHIP = "Internship",
  NONE = "None",
}

export enum PaymentStatus {
  ALL_PAID = "All Paid",
  PENDING = "Pending",
}
export type Payroll = {
  id: string;
  //   employeeProfile: IEmployeeProfile;
  name: string;
  email: string;
  mobileNo: string;
  profilePic: string;
  designation: string;
  aadharNo: string;
  panNo: string;
  bankName: string;
  bankAccountNumber: string;
  bankIfscCode: string;
  bankAccountHolderName: string;
  basic: number;
  hra: number;
  others: number;
  ctc: number;
  employmentType: EmploymentType;
  status: PaymentStatus;
  salaryMonth: number;
  tds: number;
  incentive: number;
  workingDays: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export enum PaymentTerms {
  DAYS_0 = "0 Days",
  DAYS_30 = "30 Days",
  DAYS_60 = "60 Days",
}

export const PAYROLL_TABLE_PAGE_LIMIT = 5;
