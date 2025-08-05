from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from simulador import generar_respuesta
from procesador import procesar_datos
from joblib import load
from typing import Dict 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Para desarrollo, luego puedes restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuizInput(BaseModel):
    answers: Dict[str, str]  # Recibe respuestas como dict estilo Python

# Carga modelos entrenados
label_encoders = load("modelos/encoders.joblib")
scaler = load("modelos/scaler.joblib")
models = {
    "edad": load("modelos/modelo_edad.joblib"),
    "causa": load("modelos/modelo_causa.joblib"),
    "lugar": load("modelos/modelo_lugar.joblib"),
}
encoders = {
    "edad": load("modelos/le_edad.joblib"),
    "causa": load("modelos/le_causa.joblib"),
    "lugar": load("modelos/le_lugar.joblib"),
}

@app.post("/predict")
def predict(input: QuizInput):
    try:
        print("conexion exitosa")
        entrada = input.answers
        df = procesar_datos(entrada, label_encoders, scaler)
        resultado = generar_respuesta(df, entrada, models, encoders)
        return {
            "result": resultado["causa_estimado"],
            "age": resultado["edad_estimado"],
            "place": resultado["lugar_estimado"],
        }
    except Exception as e:
        return {"error": str(e)}

