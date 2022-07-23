import "./styles/main.module.scss";
import { Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Main from "./pages/Main";
import Map from "./components/Map";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Main />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  );
}

export default App;
