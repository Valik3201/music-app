import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";

const SessionTimer: React.FC = () => {
  const currentToken = useAppSelector((state) => state.auth.currentToken);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    if (currentToken && currentToken.expires_in) {
      const expiresInDate = new Date(currentToken.expires_in);
      const timer = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = expiresInDate.getTime() - currentTime.getTime();
        setRemainingTime(Math.max(0, timeDifference));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentToken]);

  const remainingMinutes = Math.floor(remainingTime / 60000);
  const remainingSeconds = Math.floor((remainingTime % 60000) / 1000);

  const formattedTime = `${remainingMinutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="hidden md:block text-xs text-silver-400 min-w-36 text-left">
      {remainingTime > 0 ? (
        <p>Session expires in {formattedTime}</p>
      ) : (
        <p>Session expired</p>
      )}
    </div>
  );
};

export default SessionTimer;
