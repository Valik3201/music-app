import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { exchangeToken, fetchUserData } from "../../redux/auth/authOperations";
import HeroSection from "../HeroSection/HeroSection";
import Root from "../../Root/Root";

const Auth: React.FC = () => {
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

  return (
    <div className="antialiased">
      {isAuthenticated && user ? <Root /> : <HeroSection />}
    </div>
  );
};

export default Auth;
