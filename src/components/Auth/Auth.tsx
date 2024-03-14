import { useEffect } from "react";
import { redirectUri } from "../../constants/constants";
import { AuthProps } from "./types";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  exchangeToken,
  fetchUserData,
  refreshToken,
} from "../../redux/auth/authOperations";
import { logout } from "../../redux/auth/authSlice";
import HeroSection from "../HeroSection/HeroSection";

const Auth: React.FC<AuthProps> = ({ children }) => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentToken && currentToken.access_token) {
      dispatch(fetchUserData(currentToken.access_token));
    }
  }, [currentToken]);

  useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    const code = args.get("code");
    handleTokenExchange(code);
  }, []);

  const handleTokenExchange = async (code: string | null) => {
    if (code) {
      try {
        dispatch(exchangeToken(code));

        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        const updatedUrl = url.search ? url.href : url.href.replace("?", "");
        window.history.replaceState({}, document.title, updatedUrl);
      } catch (error) {
        console.error("Failed to exchange token:", error);
      }
    }
  };

  const logoutClick = () => {
    localStorage.clear();
    window.location.href = redirectUri;
    dispatch(logout());
  };

  const refreshTokenClick = () => {
    if (currentToken && currentToken.refresh_token) {
      dispatch(refreshToken(currentToken.refresh_token));
    }
  };

  return (
    <div className="antialiased">
      {isAuthenticated && user ? (
        <>
          <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-black pt-14 transition-transform -translate-x-full border-r border-green md:translate-x-0">
            <div className="overflow-y-auto py-5 px-3 h-full bg-black dark:bg-gray-800">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-extrabold">
                  Welcome Back, {user.display_name}
                </h1>
                <button
                  onClick={refreshTokenClick}
                  className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2"
                >
                  Refresh Token
                </button>
                <button
                  onClick={logoutClick}
                  className="text-black bg-green hover:opacity-80 transition duration-300 ease-in-out font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </aside>
          <main className="p-4 md:ml-64 h-auto pt-20">{children}</main>
        </>
      ) : (
        <HeroSection />
      )}
    </div>
  );
};

export default Auth;
