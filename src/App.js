import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./styles/main.module.scss";
import 'antd/dist/antd.min.css';
import { Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Main from "./pages/Main";
import Map from "./components/Map";
import MapView from "./pages/MapView";
import Details from "./pages/Details";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Main />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
}

export default App;
