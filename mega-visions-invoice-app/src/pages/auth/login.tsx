import { useForm } from "react-hook-form";
import { LoginBanner } from "../../assets/images";
import { storeApi } from "../../redux/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "../../redux/store";
import { setUser } from "../../redux/user.slice";

type AdminFormProps = {
  id?: string;
  username: string;
  passcode: string;
};

function Login() {
  const [LoginUser, { isLoading }] = storeApi.useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormProps>({
    defaultValues: {
      username: "",
      passcode: "",
    },
  });
  const onSubmit = async (data: AdminFormProps) => {
    try {
      const response = await LoginUser(data).unwrap();
      toast.success(response?.message);
      if (response) {
        navigate("/admin/dashboard");
        dispatch(setUser(response?.user));
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <section className="w-screen h-screen max-lg:w-full flex items-start bg-black max-lg:px-10 max-sm:px-5">
      {/* Banner */}
      <div className="w-full h-full max-lg:hidden">
        <img
          src={LoginBanner}
          alt="login-banner"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Form */}
      <div className="w-full h-full  text-white flex flex-col items-start justify-center px-5">
        <div className="py-8">
          <h1 className="text-4xl pb-2 font-bold text-gradient">
            MegaVisions Store
          </h1>
          <p className="text-lg">Welcome back</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-col w-full gap-5"
        >
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-400 text-lg">
              Username
            </label>
            <input
              type="text"
              id="username"
              autoComplete="false"
              className="input input-bordered border border-base-300 rounded-none bg-black text-base-300"
              placeholder="Enter your username"
              {...register("username", { required: true })}
            />
            {errors.username && <span>This field is required</span>}
          </div>
          {/* Passcode */}
          <div className="flex flex-col">
            <label htmlFor="passcode" className="text-gray-400 text-lg">
              Passcode
            </label>
            <input
              type="password"
              autoComplete="false"
              id="passcode"
              className="input input-bordered border border-base-300 rounded-none bg-black text-base-300"
              placeholder="Enter your password"
              {...register("passcode", { required: true })}
            />
            {errors.passcode && <span>This field is required</span>}
          </div>
          <div className="">
            <button
              className="w-40 max-lg:w-full btn btn-primary capitalize btn-md text-lg rounded-lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-lg"></span>
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
