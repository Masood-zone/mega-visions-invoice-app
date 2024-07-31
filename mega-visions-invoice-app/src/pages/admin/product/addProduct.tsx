import { Link, useNavigate } from "react-router-dom";
import { storeApi } from "../../../redux/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

function AddProduct() {
  const [createProduct, { isLoading }] = storeApi.useCreateProductMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormProps>();

  const onSubmit = async (data: ProductFormProps) => {
    try {
      const productData = {
        id: data.id,
        name: data.name,
        warrantyObliged: data.warrantyObliged === "true" ? 1 : 0,
        barCode: data.barCode,
      };
      const response = await createProduct(productData).unwrap();
      if (response) {
        toast.success(response?.message);
        navigate("/admin/product");
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
          <Link className="" to="/admin/product">
            <ArrowLeft size={50} />
          </Link>
          <h2 className="text-6xl font-medium text-gray-700">New Product</h2>
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
                href="/admin/product"
                className="link link-hover text-gray-400"
              >
                Products List
              </a>
            </li>
            <li>New Product</li>
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
                htmlFor="productName"
                className="text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                {...register("name", { required: "Product name is required" })}
              />
              {errors.name && (
                <span className="text-red-600">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="warrantyObliged"
                className="text-sm font-medium text-gray-700"
              >
                Warranty Obliged
              </label>
              <select
                id="warrantyObliged"
                className="select select-bordered w-full"
                {...register("warrantyObliged", {
                  required: "Warranty obliged is required",
                })}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.warrantyObliged && (
                <span className="text-red-600">
                  {errors.warrantyObliged.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="barCode"
                className="text-sm font-medium text-gray-700"
              >
                Bar Code
              </label>
              <input
                type="text"
                id="barCode"
                className="input input-bordered w-full"
                {...register("barCode", { required: "Bar code is required" })}
              />
              {errors.barCode && (
                <span className="text-red-600">{errors.barCode.message}</span>
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

export default AddProduct;
