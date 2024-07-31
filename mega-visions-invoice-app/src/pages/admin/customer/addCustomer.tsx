import { Link, useNavigate } from "react-router-dom";
import { storeApi } from "../../../redux/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

function AddCustomer() {
  const [createCustomer, { isLoading }] = storeApi.useCreateCustomerMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormProps>();

  const onSubmit = async (data: CustomerFormProps) => {
    try {
      const response = await createCustomer(data).unwrap();
      if (response) {
        toast.success(response?.message);
        navigate("/admin/customer");
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
          <Link className="" to="/admin/customer">
            <ArrowLeft size={50} />
          </Link>
          <h2 className="text-6xl font-medium text-gray-700">New Customer</h2>
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
                href="/admin/customer"
                className="link link-hover text-gray-400"
              >
                Customer List
              </a>
            </li>
            <li>New Customer</li>
          </ul>
        </div>
      </div>
      {/* Container */}
      <div className="my-5 bg-white w-full h-auto rounded-md shadow-md p-5">
        {/* Forms */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Id */}
            <div className="flex flex-col gap-2 " hidden>
              <label htmlFor="id" className="text-sm font-medium text-gray-700">
                ID
              </label>
              <input
                type="text"
                id="id"
                className="input input-bordered w-full"
                {...register("id")}
              />
            </div>
            {/* Product Name */}
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-600">{errors.name.message}</span>
              )}
            </div>
            {/* Phone Number */}
            <div className="flex flex-col gap-2 " hidden>
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="input input-bordered w-full"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <span className="text-red-600">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            {/* Home Address */}
            <div className="flex flex-col gap-2 " hidden>
              <label
                htmlFor="homeAddress"
                className="text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="homeAddress"
                className="input input-bordered w-full"
                {...register("homeAddress")}
              />
              {errors.homeAddress && (
                <span className="text-red-600">
                  {errors.homeAddress.message}
                </span>
              )}
            </div>
          </div>
          {/* Submit */}
          <div className="flex flex-col gap-4 mt-5">
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
                "Add Customer"
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

export default AddCustomer;
