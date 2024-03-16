import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { logout, setSessionExpired } from "../../redux/auth/authSlice";

interface AutoLogoutProps {
  tokenExpirationDate: Date;
}

const AutoLogout: React.FC<AutoLogoutProps> = ({ tokenExpirationDate }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      console.log("Token has expired. Logging out...");
      dispatch(logout());
      dispatch(setSessionExpired(true));
    }, tokenExpirationDate.getTime() - Date.now());

    return () => clearTimeout(timeout);
  }, [dispatch, tokenExpirationDate]);

  return null;
};

export default AutoLogout;
