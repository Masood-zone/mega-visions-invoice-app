type CompanyFormProps = {
  id: string;
  name: string;
  location: string;
  telephone: string;
};

type InvoiceFormProps = {
  id: string;
  description: string;
  date: string;
  quantity: number;
  customerId: string;
  productId: string;
  companyId: string;
  unitPrice: number;
  total: number;
};

type SalesFormProps = {
  id: string;
  purpose: string;
  name: string;
  companyId: string;
};

type ProductFormProps = {
  id: string;
  name: string;
  warrantyObliged: string;
  barCode: string;
};

type EmployeeFormProps = {
  id: string;
  name: string;
  role: string;
  skills: string;
  salesDepartmentId: string;
};

type CustomerFormProps = {
  id: string;
  name: string;
  phoneNumber: string;
  homeAddress: string;
};
