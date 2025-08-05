import React, { useState, useEffect, useRef } from "react";
import { questions } from "../data/Question";
import { FaSkullCrossbones } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DeathQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ type: "question" | "answer"; content: string }[]>([]);
  const [isMinor, setIsMinor] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const camposBackend  = [
    "SEXO",
    "EDAD",
    "CONDICION FISICA",
    "ESTADO",
    "ESCOLARIDAD",
    "OCUPACION",
    "ESTADO CIVIL",
    "VIOLENCIA FAMILIAR",
    "ATENCION MEDICA",
    "CIRUGIA"
  ];

  const labelMap: Record<string, string> = {
    "HOMBRE": "HOMBRE",
    "MUJER": "MUJER",
    "18-45": "18-45",
    "46-64": "46-64",
    "65+": "65+",
    "SI TIENE": "SI TIENE",
    "NO TIENE": "NO TIENE",
    "NORTE(NOROESTE,NOROESTE)": "NORTE (NORESTE/NOROESTE)",
    "CENTRO(CENTRO,OCCIDENTE)": "CENTRO(CENTRO/OCCIDENTE)",
    "SUR(SUR,SURESTE)": "SUR(SUR/SURESTE)",
    "SIN ESCOLARIDAD": "SIN ESCOLARIDAD",
    "PREESCOLAR": "PREESCOLAR",
    "PRIMARIA": "PRIMARIA",
    "SECUNDARIA": "SECUNDARIA",
    "PREPARATORIA": "PREPARATORIA",
    "UNIVERSIDAD": "UNIVERSIDAD",
    "POSGRADO": "POSGRADO",
    "AGRICOLA/PESQUERO/FORESTAL": "AGRICOLA/PESQUERO/FORESTAL",
    "APOYO GENERAL Y OFICIOS BASICOS": "APOYO GENERAL Y OFICIOS BASICOS",
    "COMERCIO/VENTAS": "COMERCIO/VENTAS",
    "CONSTRUCCIÓN/INDUSTRIAL/MANUAL": "CONSTRUCCION/INDUSTRIAL/MANUAL",
    "DESEMPLEADO/NO TRABAJA/OTROS": "DESEMPLEADO/NO TRABAJA/OTROS",
    "OFICINA/EDUCACIÓN/ADMINISTRACIÓN": "OFICINA/EDUCACION/ADMINISTRACION",
    "SERVICIOS PERSONALES Y SEGURIDAD": "SERVICIOS PERSONALES Y SEGURIDAD",
    "SOLTERO(A)": "SOLTERO(A)",
    "CASADO(A)": "CASADO(A)",
    "DIVORCIADO(A)": "DIVORCIADO(A)",
    "SEPARADO(A)": "SEPARADO(A)",
    "VIUDO(A)": "VIUDO(A)",
    "UNIÓN LIBRE": "UNION LIBRE",
    "SI": "SI",
    "NO": "NO",
    "CON SEGURO SOCIAL": "CON SEGURO SOCIAL",
    "SIN SEGURO SOCIAL": "SIN SEGURO SOCIAL",
  };


const sendAnswers = async () => {
  setLoading(true);

  // Validación rápida por si falta alguna respuesta
  if (answers.length < camposBackend.length) {
    setError("Faltan respuestas. Verifica el flujo.");
    setLoading(false);
    return;
  }

  // Construye el JSON con claves igual a columnas del Excel
  const finalAnswers: Record<string, string> = {};
  camposBackend.forEach((campo, idx) => {
    const respuestaOriginal = answers[idx]?.toUpperCase();
    const normalizada = labelMap[respuestaOriginal] ?? respuestaOriginal;
    finalAnswers[campo] = normalizada;
  });

  console.log("➡️ Enviando al backend:", finalAnswers);

  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: finalAnswers }),
    });

    if (!response.ok) throw new Error("No se pudo conectar con el backend");

    const result = await response.json();
    console.log("✅ Predicción recibida:", result);

    console.log("Enviando al prediction:", {
      result: result.result,
      age: result.age,
      place: result.place,
    });

    if (result.error) {
      setError(`Error del modelo: ${result.error}`);
      return;
    }

    // Redirige a la pantalla de resultados con los datos
        if (result && result.result && result.age && result.place) {
      navigate("/prediction", {
        state: {
          result: result.result,
          age: result.age,
          place: result.place,
        },
      });
    } else {
      console.error("Resultado incompleto:", result);
    }
  } catch (err: any) {
    console.error("❌ Error al conectar:", err);
    setError("Hubo un error al obtener la predicción.");
  } finally {
    setLoading(false);
  }
};

const handleAnswer = (answer: string) => {
  if (answer === "10-18" && step === 0) {
    setIsMinor(true);
    return;
  }

  setAnswers((prev) => [...prev, answer]);
  setMessages((prev) => [...prev, { type: "answer", content: answer }]);

  setIsTyping(true);
  setShowOptions(false);

  setTimeout(() => {
    const nextStep = step + 1;
    setStep(nextStep);
    setIsTyping(false);

    if (nextStep < questions.length) {
      setMessages((prev) => [...prev, { type: "question", content: questions[nextStep].question }]);
      setShowOptions(true);
    }
  }, 1000);
};

const exit = () => navigate("/exit");

useEffect(() => {
  if (chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }

  if (messages.length === 0 && !isMinor) {
    setMessages([{ type: "question", content: questions[0].question }]);
    setShowOptions(true);
  }

  if (step >= questions.length && !isMinor) {
    sendAnswers();
  }
}, [messages, isTyping, step, isMinor]);


return (
  <div className="min-h-screen bg-blackPrincipal font-sans flex flex-col items-center">
    {/* Encabezado con gradiente */}
    <div className="w-full h-16 flex justify-center items-center bg-gradient-to-r from-blackPrincipal via-red-900 to-blackPrincipal text-white shadow-lg sticky top-0 z-10">
      <FaSkullCrossbones className="text-3xl sm:text-4xl text-beigePrincipal animate-spin" />
    </div>

    {/* Contenedor del chat */}
    <div
      ref={chatRef}
      className="w-full flex-1 bg-black bg-opacity-80 rounded-b-2xl shadow-inner p-4 overflow-y-auto flex flex-col gap-5 px-2 sm:px-6 animate-fade-slide"
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.type === "question" ? "items-start" : "justify-end"} gap-2 animate-fade-slide`}
        >
          <div
            className={`shadow px-6 py-4 rounded-2xl max-w-[90%] sm:max-w-xl text-base sm:text-xl ${
              msg.type === "question"
                ? "bg-red-900 text-red-100 rounded-bl-none"
                : "bg-red-200 text-redPrincipal rounded-br-none"
            }`}
          >
            <span className="font-bold">{msg.content}</span>
          </div>
        </div>
      ))}

      {/* Si el usuario es menor */}
      {isMinor && (
        <div className="flex flex-col items-center mt-6 animate-fade-slide">
          <p className="bg-red-800 text-red-200 px-4 py-2 rounded-2xl text-base sm:text-lg mb-4 text-center shadow">
            No puedes continuar si eres menor de edad
          </p>
          <button
            onClick={exit}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-full shadow transition w-full sm:w-auto"
          >
            Salir
          </button>
        </div>
      )}

      {/* Opciones interactivas */}
      {!isMinor && step < questions.length && !isTyping && showOptions && (
        <div className="w-full flex flex-wrap justify-center items-center gap-4 px-2 animate-fade-slide">
          {questions[step].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className="w-full sm:w-auto bg-red-300 text-red-800 hover:bg-red-200 font-semibold text-base sm:text-lg px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Indicador de escritura */}
      {isTyping && (
        <div className="flex items-start gap-2 animate-fade-slide">
          <div className="bg-red-900 text-red-100 rounded-2xl rounded-bl-none px-4 py-2 shadow flex items-center text-xl">
            <span className="animate-blink font-bold">...</span>
          </div>
        </div>
      )}
    </div>
  </div>
);



};

export default DeathQuiz;
