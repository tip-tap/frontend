import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./styles/main.module.scss";
import 'antd/dist/antd.min.css';
import { Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Main from "./pages/Main";
import MapView from "./pages/MapView";
import Details from "./pages/Details";
import ListView from "./pages/ListView";
import WishListView from "./pages/WishListView";
import CreateChecklist from "./pages/CreateChecklist";
import CompareChecklist from "./pages/CompareChecklist";
import CompareMapView from "./pages/CompareMapView";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Main />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/details" element={<Details />} />
      <Route path="/list" element={<ListView />} />
      <Route path="/wishlist" element={<WishListView />} />
      <Route path="/createcl" element={<CreateChecklist />} />
      <Route path="/compare" element={<CompareChecklist />} />
      <Route path="/compare_map" element={<CompareMapView />} />
    </Routes>
  );
}

export default App;
