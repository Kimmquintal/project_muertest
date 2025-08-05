import { FaSkullCrossbones } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

const PredictionScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as
    | { result: string; age: string; place: string }
    | undefined;
  const [isReady, setIsReady] = useState(false);


  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    } else {
      // Simula loading suave antes de mostrar resultado
      const timeout = setTimeout(() => setIsReady(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, [state, navigate]);


  if (!state || !isReady) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-redPrincipal text-beigePrincipal font-carolloPlayscript">
        <div className="flex flex-col items-center animate-fade-slide">
          <FaSkullCrossbones className="text-6xl sm:text-7xl text-blackPrincipal animate-spin-slow mb-4" />
          <p className="text-lg sm:text-xl text-center animate-pulse">
            Calculando tu destino...
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen w-full px-6 flex items-center flex-col justify-center bg-redPrincipal text-beigePrincipal font-carolloPlayscript">
      <FaSkullCrossbones className="text-7xl sm:text-8xl md:text-9xl text-blackPrincipal hover:scale-110 transition-transform duration-300" />

      <h3 className="text-lg sm:text-xl md:text-2xl mt-3 mb-4 text-center">
        De acuerdo a los datos obtenidos...
      </h3>

      <p className="text-base sm:text-lg mt-2">Tu causa de muerte es:</p>
      <h2 className="text-3xl sm:text-4xl text-blackPrincipal font-bold mt-4 hover:cursor-pointer hover:text-red-300 transition-colors duration-300 text-center">
        {state.result}
      </h2>
      <div className="w-3/4 sm:w-1/2 h-[2px] my-4 bg-gradient-to-r from-beigePrincipal via-white/20 to-beigePrincipal rounded-full" />

      <p className="text-base sm:text-lg mt-2">Rango de edad estimada:</p>
      <h2 className="text-3xl sm:text-4xl text-blackPrincipal font-bold mt-4 hover:cursor-pointer hover:text-red-300 transition-colors duration-300 text-center">
        {state.age}
      </h2>
      <div className="w-3/4 sm:w-1/2 h-[2px] my-4 bg-gradient-to-r from-beigePrincipal via-white/20 to-beigePrincipal rounded-full" />

      <p className="text-base sm:text-lg mt-2">Lugar estimado:</p>
      <h2 className="text-3xl sm:text-4xl text-blackPrincipal font-bold mt-4 hover:cursor-pointer hover:text-red-300 transition-colors duration-300 text-center">
        {state.place}
      </h2>
      <div className="w-3/4 sm:w-1/2 h-[2px] my-4 bg-gradient-to-r from-beigePrincipal via-white/20 to-beigePrincipal rounded-full" />

      <div className="flex flex-col sm:flex-row items-center mt-6 gap-4">
        <button
          onClick={() => navigate("/quiz")}
          className="bg-greyButon text-beigePrincipal font-bold py-2 px-6 rounded-full hover:bg-red-300 transition-colors duration-300 w-full sm:w-auto"
        >
          Volver a intentar
        </button>
        <button
          onClick={() => navigate("/exit")}
          className="bg-greyButon text-beigePrincipal font-bold py-2 px-6 rounded-full hover:bg-black-300 transition-colors duration-300 w-full sm:w-auto"
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default PredictionScreen;
