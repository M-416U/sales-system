export interface ICustomer {
  CustomerID?: number;
  FullName: string;
  Email: string;
  Phone: string;
  Address: string;
  RegistrationDate: Date;
  SubscriptionStartDate: Date;
  SubscriptionEndDate: Date;
  PaymentMethod: string;
  AssignedEmployeeID: number;
  // Notes: string;
}
