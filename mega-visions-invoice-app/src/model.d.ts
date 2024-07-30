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
