import { useState, useEffect } from "react";
import { useToken } from "../../hooks/useToken";
import { getToken, getUserData } from "../../api/spotify";
import { redirectUri } from "../../constants/constants";
import { AuthProps, User } from "./types";
import HeroSection from "../HeroSection/HeroSection";

const Auth: React.FC<AuthProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { accessToken, saveToken, refreshAccessToken } = useToken();

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const userData = await getUserData(accessToken);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchData();
  }, [accessToken]);

  useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    const code = args.get("code");
    handleTokenExchange(code);
  }, []);

  const handleTokenExchange = async (code: string | null) => {
    if (code) {
      try {
        const token = await getToken(code);
        saveToken(token);

        // Remove code from URL after token exchange
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
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshTokenClick = async () => {
    await refreshAccessToken();
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
