import { useSelector } from "../redux/store";

export const useAuth = () => {
  const isAuthenticated = useSelector(
    (state) => state.persistedReducer.user.isAuth
  );
  return isAuthenticated;
};
