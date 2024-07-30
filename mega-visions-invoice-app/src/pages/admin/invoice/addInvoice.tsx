import { storeApi } from "../../../redux/api";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

function AddInvoice() {
  const [createInvoice, { isLoading }] = storeApi.useCreateInvoiceMutation();
  const { data: companyData } = storeApi.useGetAllCompaniesQuery({});
  const { data: productData } = storeApi.useGetAllProductsQuery({});
  const { data: customerData } = storeApi.useGetAllCustomersQuery({});
  const [company, setCompany] = useState<[]>([]);
  const [product, setProduct] = useState<[]>([]);
  const [customer, setCustomer] = useState<[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormProps>();

  useEffect(() => {
    if (companyData) {
      setCompany(companyData);
    }
    if (productData) {
      setProduct(productData);
    }
    if (customerData) {
      setCustomer(customerData);
    }
  }, [companyData, productData, customerData]);

  const onSubmit = async (data: InvoiceFormProps) => {
    try {
      const invoiceData = {
        ...data,
        total: data.amount * data.quantity,
      };
      const response = await createInvoice(invoiceData).unwrap();
      if (response) {
        toast.success(response?.message);
        navigate("/admin/invoice");
      }
    } catch (error) {
      console.log(error);
      toast.error((error as { data: { error: string } })?.data?.error);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <section className="w-full h-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-between gap-2">
          <Link className="" to="/admin/invoice">
            <ArrowLeft size={50} />
          </Link>
          <h2 className="text-6xl font-medium text-gray-700">New Invoice</h2>
        </div>
        {/* Breacdcrumb */}
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a
                href="/admin/dashboard"
                className="link link-hover text-gray-400"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/invoice"
                className="link link-hover text-gray-400"
              >
                Invoice List
              </a>
            </li>
            <li>New Invoice</li>
          </ul>
        </div>
      </div>
      {/* Container */}
      <div className="my-5 bg-white w-full h-auto rounded-md shadow-md p-5">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
          <div className="flex flex-col gap-4">
            <label htmlFor="id" className="text-lg font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              id="id"
              className="input input-bordered w-full"
              {...register("id", { required: "ID is required" })}
            />
            {errors.id && <p className="text-red-500">{errors.id.message}</p>}
          </div>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="description"
              className="text-lg font-medium text-gray-700"
            >
              Description
            </label>
            {/* Textarea */}
            <textarea
              id="description"
              className="textarea textarea-bordered w-full"
              {...register("description", {
                required: "Description is required",
              })}
              rows={5}
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="date" className="text-lg font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="input input-bordered w-full"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="quantity"
              className="text-lg font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="input input-bordered w-full"
              {...register("quantity", { required: "Quantity is required" })}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="customerId"
              className="text-lg font-medium text-gray-700"
            >
              Customer
            </label>
            {/* Select */}
            <select
              id="customerId"
              className="select select-bordered w-full"
              {...register("customerId", {
                required: "Customer is required",
              })}
            >
              <option value="">Select a customer</option>
              {customer?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.customerId && (
              <p className="text-red-500">{errors.customerId.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="productId"
              className="text-lg font-medium text-gray-700"
            >
              Product
            </label>
            {/* Select */}
            <select
              id="productId"
              className="select select-bordered w-full"
              {...register("productId", {
                required: "Product is required",
              })}
            >
              <option value="">Select a product</option>
              {product?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.productId && (
              <p className="text-red-500">{errors.productId.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="companyId"
              className="text-lg font-medium text-gray-700"
            >
              Company
            </label>
            {/* Select */}
            <select
              id="companyId"
              className="select select-bordered w-full"
              {...register("companyId", {
                required: "Company is required",
              })}
            >
              <option value="">Select a company</option>
              {company?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.companyId && (
              <p className="text-red-500">{errors.companyId.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="unitPrice"
              className="text-lg font-medium text-gray-700"
            >
              Unit Price
            </label>
            <input
              type="number"
              id="unitPrice"
              className="input input-bordered w-full"
              {...register("unitPrice", { required: "Unit Price is required" })}
            />
            {errors.unitPrice && (
              <p className="text-red-500">{errors.unitPrice.message}</p>
            )}
          </div>
          {/* Submit */}
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="btn btn-primary text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                "Create Invoice"
              )}
            </button>
            <button type="button" onClick={handleReset} className="btn text-lg">
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddInvoice;
