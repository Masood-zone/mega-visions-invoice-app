import toast from "react-hot-toast";
import { UserProfileLoader } from "../../../components/loader";
import { storeApi } from "../../../redux/api";
import { useSelector } from "../../../redux/store";
import { useForm } from "react-hook-form";
import { useState } from "react";

type UserProfile = {
  id: string;
  username: string;
  passcode: string;
};

function Profile() {
  const id = useSelector((state) => state.persistedReducer.user.user?.id);
  const { data: user, isLoading, error } = storeApi.useUserProfileQuery(id);
  const [updateUser, { isLoading: Loading, error: Error }] =
    storeApi.useUpdateUserMutation();
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm<UserProfile>();
  const defaultValues = {
    Id: user?.Id || "",
    Username: user?.username || "",
    Passcode: user?.passcode || "",
  };

  const onSubmit = async (data: UserProfile) => {
    try {
      const userData = {
        id: user?.id,
        Username: data.username,
        Passcode: data.passcode,
      };
      const response = await updateUser(userData).unwrap();
      if (response) {
        toast.success("Admin updated successfully!");
      }
    } catch (error) {
      const errorMessage = error?.data?.error;
      toast.error(errorMessage);
    }
  };

  if (isLoading) return <UserProfileLoader />;
  if (error) {
    return <div>Error: {Error?.data?.error}</div>;
  }

  return (
    <section className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-start ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-700">Admin Profile</h2>
        </div>
        {/* Breacdcrumb */}
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a
                href="/admin/dashboard"
                className="link link-hover text-gray-400"
              >
                Home
              </a>
            </li>
            <li>Profile</li>
          </ul>
        </div>
      </div>
      {/* Profile section */}
      <div className="w-full bg-white shadow-md rounded-br-md rounded-bl-md mt-10">
        {/* Top section */}
        <div className="w-full h-auto">
          {/* Image */}
          <div
            className="
      bg-backdrop h-[200px] rounded-none
      "
          ></div>
          {/* Profile */}
          <div className="flex flex-col items-start mt-9 gap-2">
            <div className="ml-4">
              <h1 className="font-medium text-[24px] capitalize">
                {user?.Username} - Admin
              </h1>
            </div>
          </div>
        </div>
        {/* Admin information */}
        <div className="px-5 py-5">
          <form
            className="grid grid-cols-2 max-md:grid-cols-1 w-full gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Username */}
            <div>
              <h1 className="text-[22px]">Username</h1>
            </div>
            <div>
              <input
                type="username"
                placeholder="username"
                className="w-full border border-gray-300 rounded-md p-2 text-lg capitalize"
                {...register("username", { required: true })}
                defaultValue={defaultValues.Username}
              />
            </div>
            {/* Admin Id */}
            <div>
              <h1 className="text-[22px]">Passcode</h1>
            </div>
            <div className="input input-bordered flex items-center justify-between">
              <input
                type={show ? "text" : "password"}
                placeholder="Passcode"
                className="grow"
                {...register("passcode", { required: true })}
                defaultValue={defaultValues.Passcode}
              />
              <span
                className="text-secondary-500 text-sm cursor-pointer"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <button
                type="submit"
                className="btn btn-primary text-white py-2 px-10 uppercase text-base rounded-sm"
                onClick={handleSubmit(onSubmit)}
                disabled={Loading}
              >
                {Loading ? "Updating" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;
