import "./styles/main.module.scss";
import { Route, Routes } from "react-router-dom";
import Test from "./pages/Test";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
