import { Link, useNavigate } from "react-router-dom";
import { storeApi } from "../../../redux/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

function AddSales() {
  const [createSale, { isLoading }] = storeApi.useCreateSalesMutation();
  const { data: companyData } = storeApi.useGetAllCompaniesQuery({});
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  useEffect(() => {
    if (companyData) {
      setCompany(companyData);
    }
  }, [companyData]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SalesFormProps>();

  const onSubmit = async (data: SalesFormProps) => {
    try {
      const response = await createSale(data).unwrap();
      if (response) {
        toast.success(response?.message);
        navigate("/admin/sales-department");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error);
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
          <Link className="" to="/admin/sales">
            <ArrowLeft size={50} />
          </Link>
          <h2 className="text-6xl font-medium text-gray-700">
            New Sales Department
          </h2>
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
                href="/admin/company"
                className="link link-hover text-gray-400"
              >
                Sales Department List
              </a>
            </li>
            <li>New Sales Department</li>
          </ul>
        </div>
      </div>
      {/* Container */}
      <div className="my-5 bg-white w-full h-auto rounded-md shadow-md p-5">
        {/* Forms */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
          {/* ID */}
          <div className="flex flex-col gap-2">
            <label htmlFor="id" className="text-gray-500">
              ID
            </label>
            <input
              type="text"
              {...register("id", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.id && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-500">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* Company */}
          <div className="flex flex-col gap-2">
            <label htmlFor="companyId" className="text-gray-500">
              Company
            </label>
            <select
              {...register("companyId", { required: true })}
              className="select select-bordered w-full"
            >
              {company?.map((item: { id: string; name: string }) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.companyId && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* Purpose */}
          <div className="flex flex-col gap-2">
            <label htmlFor="purpose" className="text-gray-500">
              Purpose
            </label>
            {/* Textarea */}
            <textarea
              {...register("purpose", { required: true })}
              className="textarea textarea-bordered w-full"
              rows={5}
            ></textarea>
            {errors.purpose && (
              <span className="text-red-500">This field is required</span>
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
                "Create Sale"
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

export default AddSales;
