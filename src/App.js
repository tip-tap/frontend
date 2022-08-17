import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./styles/main.module.scss";
import 'antd/dist/antd.min.css';
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import MapView from "./pages/MapView";
import Details from "./pages/Details";
import ListView from "./pages/ListView";
import WishListView from "./pages/WishListView";
import ChecklistForm from "./pages/ChecklistForm";
import CompareChecklist from "./pages/CompareChecklist";
import CompareMapView from "./pages/CompareMapView";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <>
      <Helmet>
          <link rel="icon" type="image/svg" href="tiptap-favicon.svg" sizes="16x16" />
        </Helmet>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<MapView type="normal" />} />
        <Route path="/list" element={<ListView />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/wishmap" element={<MapView type="wish" />} />
        <Route path="/wishlist" element={<WishListView />} />
        <Route path="/create_checklist" element={<ChecklistForm type="create" />} />
        <Route path="/edit_checklist/:id" element={<ChecklistForm type="edit" />} />
        <Route path="/open_checklist/:id" element={<ChecklistForm type="open" />} />
        <Route path="/compare_list" element={<CompareChecklist />} />
        <Route path="/compare_map" element={<CompareMapView />} />
      </Routes>
    </>
  );
}

export default App;
