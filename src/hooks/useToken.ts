import { useState } from "react";
import { getRefreshToken } from "../api/spotify";

interface Token {
  access_token: string | null;
  refresh_token: string | null;
  expires_in: string | null;
}

export const useToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token") || null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refresh_token") || null
  );

  const saveToken = (response: Token) => {
    const { access_token, refresh_token, expires_in } = response;

    localStorage.setItem("access_token", access_token!);
    localStorage.setItem("refresh_token", refresh_token!);
    localStorage.setItem("refresh_in", expires_in!);

    const now = new Date();
    const expiry = new Date(now.getTime() + parseInt(expires_in!) * 1000);
    localStorage.setItem("expires", expiry.toString());

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
  };

  const refreshAccessToken = async () => {
    const token = await getRefreshToken(refreshToken);
    saveToken(token);
  };

  return { accessToken, refreshToken, saveToken, refreshAccessToken };
};
