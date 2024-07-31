import { Link, useNavigate } from "react-router-dom";
import { storeApi } from "../../../redux/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

function AddEmployee() {
  const [createEmployee, { isLoading }] = storeApi.useCreateEmployeeMutation();
  const { data: salesData } = storeApi.useGetAllSalesQuery({});
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  useEffect(() => {
    if (salesData) {
      setSales(salesData);
    }
  }, [salesData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormProps>();

  const onSubmit = async (data: EmployeeFormProps) => {
    try {
      const response = await createEmployee(data).unwrap();
      if (response) {
        toast.success(response?.message);
        navigate("/admin/employee");
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
          <Link className="" to="/admin/employee">
            <ArrowLeft size={50} />
          </Link>
          <h2 className="text-6xl font-medium text-gray-700">New Employee</h2>
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
                href="/admin/employee"
                className="link link-hover text-gray-400"
              >
                Employee List
              </a>
            </li>
            <li>New Employee</li>
          </ul>
        </div>
      </div>
      {/* Conatiner */}
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
          {/* Sales department */}
          <div className="flex flex-col gap-2">
            <label htmlFor="salesDepartmentId" className="text-gray-500">
              Department
            </label>
            <select
              {...register("salesDepartmentId", { required: true })}
              className="select select-bordered w-full"
            >
              {sales?.map((item: { id: string; name: string }) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.salesDepartmentId && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* Skills */}
          <div className="flex flex-col gap-2">
            <label htmlFor="skills" className="text-gray-500">
              Skills
            </label>
            <input
              type="text"
              {...register("skills", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.skills && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* Role */}
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-gray-500">
              Role
            </label>
            <textarea
              {...register("role", { required: true })}
              className="textarea textarea-bordered w-full"
              rows={5}
            ></textarea>
            {errors.role && (
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
                "Add Employee"
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

export default AddEmployee;
