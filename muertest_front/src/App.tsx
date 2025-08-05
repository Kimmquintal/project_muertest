import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "./routes/LoadingScreen";
import WarningRoute from "./routes/WarningRoute";
import QuizRoute from "./routes/QuizRoute";
import ExitScreen from "./routes/ExitScreen";
import PredictionRoute from "./routes/PredictionRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/warning" element={<WarningRoute />} />
      <Route path="/quiz" element={<QuizRoute />} />
      <Route path="/exit" element={<ExitScreen />} />
      <Route path="/prediction" element={<PredictionRoute />} />
    </Routes>
  );
}
