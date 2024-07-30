import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storeApi } from "../../../redux/api";
import moment from "moment";

function InvoicePage() {
  const { id } = useParams();
  const {
    data: invoiceData,
    isLoading,
    error,
  } = storeApi.useGetSingleInvoiceQuery(id);
  const { data: companyData } = storeApi.useGetAllCompaniesQuery({});
  const { data: productData } = storeApi.useGetAllProductsQuery({});
  const { data: customerData } = storeApi.useGetAllCustomersQuery({});
  const [company, setCompany] = useState<[]>([]);
  const [product, setProduct] = useState<[]>([]);
  const [customer, setCustomer] = useState<[]>([]);
  const [matchedCompany, setMatchedCompany] = useState([]);
  const [matchedProduct, setMatchedProduct] = useState([]);
  const [matchedCustomer, setMatchedCustomer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (companyData) {
      setCompany(companyData);
      const matchedCompany = company.filter(
        (c) => c.id === invoiceData.companyId
      );
      setMatchedCompany(matchedCompany);
    }
    if (productData) {
      setProduct(productData);
      const matchedProduct = product.filter(
        (p) => p.id === invoiceData.productId
      );
      setMatchedProduct(matchedProduct);
    }
    if (customerData) {
      setCustomer(customerData);
      const matchedCustomer = customer.filter((c) => c.id === invoiceData.id);
      setMatchedCustomer(matchedCustomer);
    }
  }, [companyData, productData, customerData, invoiceData]);

  console.log(matchedCompany, matchedProduct, matchedCustomer);
  console.log(invoiceData);
  return (
    <section className="w-full h-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-6xl font-medium text-gray-700">Invoice #{id}</h2>
        </div>
        {/* Breacdcrumb */}
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a
                href="/admin/invoice"
                className="link link-hover text-gray-400"
              >
                Invoices List
              </a>
            </li>
            <li>Invoice #{id}</li>
          </ul>
        </div>
      </div>
      {/* Main */}
      <div className="w-full border-2 px-5">
        {/* Company Info */}
        <div className="grid grid-cols-3 grid-rows-2">
          {/* Row 1 Col 1 */}
          <div className="h-auto flex flex-col items-start py-5 gap-2">
            {/* Company Name */}
            <div className="w-full border h-16 flex items-center justify-center bg-primary-600 text-white">
              <h1 className="uppercase font-bold text-3xl">
                {matchedCompany[0]?.name || "Company Name"}
              </h1>
            </div>
            {/* Location */}
            <div className="">
              <p className="text-base">
                <span className="uppercase font-medium pr-2">Location:</span>
                {matchedCompany[0]?.location || "Company Address"}
              </p>
            </div>
            {/* Phone */}
            <div className="">
              <p className="text-base">
                <span className="uppercase font-medium pr-2">Phone:</span>
                {matchedCompany[0]?.telephone || "Company Phone"}
              </p>
            </div>
          </div>
          {/* Row 1 Col 2 */}
          <div className="h-auto"></div>
          {/* Row 1 Col 3 */}
          <div className="h-auto flex flex-col items-start py-5 gap-2">
            {/* Invoice title*/}
            <h1 className="text-4xl font-bold uppercase">Invoice</h1>
            {/* Invoice Date */}
            <p className="text-base">
              <span className="uppercase font-medium pr-2">Date:</span>{" "}
              {moment(invoiceData?.date).format("LLL")}
            </p>
            {/* Invoice Number */}
            <p className="text-base">
              <span className="uppercase font-medium pr-2">Invoice#:</span>
              {invoiceData?.id}
            </p>
          </div>
          {/* Row 2 col 1 */}
          <div className="h-auto flex flex-col items-start border-t-4 border-t-blue-500 py-5 gap-2">
            <div>
              <h1 className="text-xl font-medium">Bill To:</h1>
            </div>
            {/* Customer Name */}
            <h1 className="text-lg">
              <span className="uppercase font-medium pr-2">Name:</span>
              {matchedCustomer[0]?.name || "Customer Name"}
            </h1>
            {/* Location */}
            <div className="">
              <p className="text-base">
                <span className="uppercase font-medium pr-2">Location:</span>
                {matchedCustomer[0]?.location || "Customer Address"}
              </p>
            </div>
            {/* Phone */}
            <div className="">
              <p className="text-base">
                <span className="uppercase font-medium pr-2">Phone:</span>
                {matchedCustomer[0]?.telephone || "Customer Phone"}
              </p>
            </div>
          </div>
          {/* Row 2 col 2 */}
          <div className="h-auto border-t-4 border-t-blue-500 pt-3"></div>
          {/* Row 2 col 3 */}
          <div className="h-auto border-t-4 border-t-blue-500 pt-3"></div>
        </div>
        {/* Table */}
        <div className=" my-5">
          <table className="table table-auto w-full">
            <thead>
              <tr className="bg-primary-600 text-white">
                <th className="p-2 text-lg font-medium">Product</th>
                <th className="p-2 text-lg font-medium">Description</th>
                <th className="p-2 text-lg font-medium">Quantity</th>
                <th className="p-2 text-lg font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="text-base py-4">
                  {matchedProduct[0]?.name || "Product Name"}
                </td>
                <td className="text-base py-4">
                  {invoiceData?.description || "Description"}
                </td>
                <td className="text-base py-4">
                  {invoiceData?.quantity || "Quantity"}
                </td>
                <td className="text-base py-4">
                  {invoiceData?.unitPrice || "Price"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Footer & Totals */}
        <div className="grid grid-cols-3 py-5">
          {/* Footer */}
          <div className="col-span-2">
            <div className="flex flex-col items-start gap-2">
              <p>
                Make all checks payable to{" "}
                <span className="font-medium hover:link-hover">
                  {matchedCompany[0]?.name || "Company Name"}
                </span>
                . If you have any questions concerning this invoice, contact:{" "}
                <span className="font-medium hover:link-hover">
                  {matchedCompany[0]?.telephone || "Company Contact"}
                </span>
                .
              </p>
              <p className="uppercase font-bold text-lg py-3">
                Thank you for your business. We appreciate it very much.
              </p>
            </div>
          </div>
          {/* Totals */}
          <div className="col-span-1">
            <div className="flex flex-col items-start gap-2">
              <div>
                <p className="text-base">
                  <span className="uppercase font-medium pr-2">Subtotal:</span>
                  {invoiceData?.subtotal || "Subtotal"}
                </p>
              </div>
              <div>
                <p className="text-base">
                  <span className="uppercase font-medium pr-2">Tax:</span>
                  {invoiceData?.tax || "Tax"}
                </p>
              </div>
              <div>
                <p className="text-base">
                  <span className="uppercase font-medium pr-2">Discount:</span>
                  {invoiceData?.discount || "Discount"}
                </p>
              </div>
              <div>
                <p className="text-base">
                  <span className="uppercase font-medium pr-2">Total:</span>
                  {invoiceData?.total || "Total"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Print Button */}
      <div className="flex justify-start w-60 my-5 gap-3">
        <button
          className="btn btn-primary w-full text-lg"
          onClick={() => window.print()}
        >
          Print
        </button>
        {/* Go back */}
        <button className="btn w-full text-lg" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </section>
  );
}

{
  /* <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{matchedCompany[0]?.name}</td>
              <td>{matchedProduct[0]?.name}</td>
              <td>{matchedCustomer[0]?.name}</td>
              <td>{invoiceData.quantity}</td>
              <td>{invoiceData.price}</td>
              <td>{invoiceData.total}</td>
              <td>
                <button>Print</button>
              </td>
            </tr>
          </tbody>
        </table> */
}
export default InvoicePage;
