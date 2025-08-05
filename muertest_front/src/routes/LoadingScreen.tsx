import React from "react";
import { FaSkullCrossbones } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/warning");
    }, 5000); // 2 segundos de loading
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blackPrincipal text-white">
      <FaSkullCrossbones
        style={{ fontSize: "12rem" }}
        className="text-redPrincipal mb-4 animate-pulse"
      />
      <h1 className="text-9xl font-creepster text-beigePrincipal font-pirate animate-pulse">
        MUERTEST
      </h1>
    </div>
  );
};

export default LoadingScreen;
