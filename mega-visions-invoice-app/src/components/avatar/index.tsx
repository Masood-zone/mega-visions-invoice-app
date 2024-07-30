import { ChevronDown, ChevronUp, CircleX } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../redux/store";
import { storeApi } from "../../redux/api";
import { logout } from "../../redux/user.slice";
import toast from "react-hot-toast";
import { userProfile } from "../../assets/images";

function Avatar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const id = useSelector((state) => state.persistedReducer.user.user?.id);
  const { data: user, isLoading } = storeApi.useUserProfileQuery(id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
    toast.success("Logged out successfully");
  };
  return (
    <aside className="w-64">
      {isLoading ? (
        <>
          <div className="border w-full flex items-center gap-5 py-2 justify-center rounded-md shadow drop-shadow-md">
            <span className="loading loading-spinner loading-md"></span>
            Loading...
          </div>
        </>
      ) : (
        <>
          {/* Large Screens */}
          <div className="max-lg:hidden">
            {/* Profile card */}
            <div className="flex items-center justify-around px-1 rounded bg-white drop-shadow-md">
              {/* Avatar */}
              <div className="avatar py-1">
                <div className="w-12 rounded-md">
                  <img src={userProfile} alt="user-profile" />
                </div>
              </div>
              {/* Admin name */}
              <div>
                <p>Admin</p>
                <p className="font-normal text-lg capitalize">
                  {user?.Username}
                </p>
              </div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="ml-2"
              >
                {dropdownOpen ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </button>
            </div>
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-20 bg-white w-72 py-2 px-2 shadow-lg rounded-lg">
                <ul>
                  <li className=" text-lg px-4 py-2 rounded-lg hover:bg-gray-100 w-full">
                    <Link to="/admin/profile">Profile</Link>
                  </li>
                  <li className=" text-lg px-4 py-2 rounded-lg hover:bg-gray-100 w-full">
                    <button onClick={() => setShowModal(true)}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Mobile Screens */}
          <div className="lg:hidden mt-16">
            {/* Profile card */}
            <div className="flex items-center px-1 gap-2 rounded  drop-shadow-md">
              {/* Profile */}
              <div className="avatar py-1">
                <div className="w-12 rounded-md">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              {/* Admin name */}
              <div>
                <p>Admin</p>
                <p className="font-normal text-lg capitalize">
                  {user?.Username}
                </p>
              </div>
              <button onClick={() => handleLogout()}>
                <CircleX />
              </button>
            </div>
          </div>
        </>
      )}
      {/* Modal notice */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setShowModal(false); // Close modal
                  handleLogout(); // Proceed with logout
                }}
                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)} // Close modal without logging out
                className="bg-gray-200 text-black px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Avatar;
