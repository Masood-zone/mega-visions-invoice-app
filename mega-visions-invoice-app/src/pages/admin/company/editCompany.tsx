import { Link, useNavigate, useParams } from "react-router-dom";
import { storeApi } from "../../../redux/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function EditCompany() {
  const { id } = useParams();
  const {
    data: company,
    isLoading,
    error,
  } = storeApi.useGetSingeCompanyQuery(id);
  const [updateCompany, { isLoading: Loading }] =
    storeApi.useUpdateCompanyMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormProps>({
    defaultValues: {
      id: id,
      name: company?.name,
      telephone: company?.telephone,
      location: company?.location,
    },
  });
  const defaultValues = {
    id: id,
    name: company?.name,
    telephone: company?.telephone,
    location: company?.location,
  };
  const onSubmit = async (data: CompanyFormProps) => {
    try {
      const response = await updateCompany(data).unwrap();
      if (response) {
        toast.success(response?.message);
        navigate("/admin/company");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error);
    }
  };

  return (
    <section className="">
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-between gap-2">
          <Link className="" to="/admin/company">
            <ArrowLeft size={50} />
          </Link>
          <h2 className="text-6xl font-medium text-gray-700">Edit Company</h2>
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
            <li>Edit Company</li>
          </ul>
        </div>
      </div>
      {/* Form */}
      {isLoading ? (
        <div className="flex w-auto border rounded-md mx-auto h-auto py-5 items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
          Loading Company Data...
        </div>
      ) : error ? (
        <div className="flex flex-col w-auto border rounded-md h-auto p-5 items-start gap-5 justify-center">
          <p className="text-lg">Opps, you encountered an error.</p>
          <p className="text-red-600">
            {(error as FetchBaseQueryError)?.status}
          </p>
          <p className="text-red-600">
            {(error as FetchBaseQueryError)?.error}
          </p>
        </div>
      ) : (
        <div className="my-5 bg-white w-full h-auto rounded-md shadow-md p-5">
          <form
            className="w-full flex flex-col mt-8 gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Name */}
            <div className="flex flex-col w-full items-start gap-3">
              <label htmlFor="name" className="text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                defaultValue={defaultValues.name}
              />
              {errors.name && (
                <span className="text-red-500">Company name is required</span>
              )}
            </div>
            {/* Telephone */}
            <div className="flex flex-col w-full items-start gap-3">
              <label htmlFor="telephone" className="text-gray-700">
                Telephone
              </label>
              <input
                type="text"
                id="telephone"
                {...register("telephone", { required: true })}
                className="input input-bordered w-full"
                defaultValue={defaultValues.telephone}
              />
              {errors.telephone && (
                <span className="text-red-500">Telephone is required</span>
              )}
            </div>
            {/* Location */}
            <div className="flex flex-col w-full items-start gap-3">
              <label htmlFor="location" className="text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                {...register("location", { required: true })}
                className="input input-bordered w-full"
                defaultValue={defaultValues.location}
              />
              {errors.location && (
                <span className="text-red-500">Location is required</span>
              )}
            </div>
            {/* Submit */}
            <div className="my-3">
              <button
                type="submit"
                className="btn btn-md px-10 text-lg rounded btn-primary disabled:text-black"
                disabled={Loading}
              >
                {Loading ? (
                  <>
                    <span className="loading loading-spinner loading-md"></span>
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default EditCompany;
