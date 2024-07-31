import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { storeApi } from "../../../redux/api";
import toast from "react-hot-toast";

function AddCompany() {
  const [createCompany, { isLoading }] = storeApi.useCreateCompanyMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormProps>();

  const onSubmit = async (data: CompanyFormProps) => {
    try {
      const response = await createCompany(data).unwrap();
      if (response) {
        toast.success(response?.message);
        navigate("/admin/company");
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
          <Link className="" to="/admin/company">
            <ArrowLeft size={50} />
          </Link>
          <h2 className="text-6xl font-medium text-gray-700">New Company</h2>
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
                Company List
              </a>
            </li>
            <li>New Company</li>
          </ul>
        </div>
      </div>
      {/* Container */}
      <div className="my-5 bg-white w-full h-auto rounded-md shadow-md p-5">
        {/* Forms */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
          {/* ID */}
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="id">Company ID</label>
            <input
              type="text"
              {...register("id", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.id && <p className="text-red-600">{errors.id.message}</p>}
          </div>
          {/* Name */}
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          {/* Telephone */}
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="telephone">Company Telephone</label>
            <input
              type="text"
              {...register("telephone", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.telephone && (
              <p className="text-red-600">{errors.telephone.message}</p>
            )}
          </div>
          {/* Location */}
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="location">Company Branch/Location</label>
            <input
              type="text"
              {...register("location", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.location && (
              <p className="text-red-600">{errors.location.message}</p>
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
                "Create Company"
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

export default AddCompany;
