import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/auth/authSlice";

interface AutoLogoutProps {
  tokenExpirationDate: Date;
}

const AutoLogout: React.FC<AutoLogoutProps> = ({ tokenExpirationDate }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Token has expired. Logging out...");
      dispatch(logout());
    }, tokenExpirationDate.getTime() - Date.now());

    return () => clearTimeout(timeout);
  }, [tokenExpirationDate]);

  return null;
};

export default AutoLogout;
