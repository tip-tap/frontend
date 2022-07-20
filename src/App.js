import "./styles/main.module.scss";
import { Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
