from pydantic import BaseModel
from typing import Dict

class QuizInput(BaseModel):
    """
    Modelo de entrada que recibe las respuestas del usuario en formato clave-valor.
    Ejemplo:
    {
        "edad": "35",
        "causa": "caída",
        "lugar": "trabajo"
    }
    """
    answers: Dict[str, str]
