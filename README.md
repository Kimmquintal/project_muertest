# 💀 MUERTEST: Predicción de muerte basada en perfil demográfico

Aplicación interactiva tipo chat que simula una experiencia conversacional predictiva basada en factores demográficos. El usuario responde preguntas y la app estima causa de muerte, edad y lugar probable en función de su perfil.

---

## 🚀 ¿Cómo descargar el repositorio?

### 🧱 Requisitos previos

- Tener instalado **Node.js** y **npm**
- Tener instalado **Python 3.10+**
- (Opcional) Crear un entorno virtual para el backend

---

### 🧭 Clonar el proyecto

```bash
git clone https://github.com/Kimmquintal/project_muertest.git
cd project_muertest
```

---

## 🧩 Estructura del proyecto

```
project_muertest/
├── muertest_front/     # Frontend en React + Tailwind
├── muertest_backend/   # Backend en FastAPI
└── modelos/            # Modelos entrenados (.joblib) y encoders
```

---

## 🖥️ Cómo correr el frontend (React)

```bash
cd muertest_front
npm install
npm run dev
```

_Accede en el navegador a_: `http://localhost:5173`

---

## 🔌 Cómo correr el backend (FastAPI)

```bash
cd muertest_backend
pip install -r requirements.txt
uvicorn main:app --reload
```

_API disponible en_: `http://localhost:8000`

---

## 📦 Modelos

Los modelos entrenados se encuentran en la carpeta `/modelos/` y se cargan automáticamente por el backend. Asegúrate de que estén presentes al levantar el servidor.

---

## 🧠 Predicción

Cuando el usuario termina el quiz, se envía al endpoint `/predict` un diccionario con las respuestas, y el backend retorna:

```json
{
  "result": "Asfixia",
  "age": "65+",
  "place": "SUR(SUR/SURESTE)"
}
```
