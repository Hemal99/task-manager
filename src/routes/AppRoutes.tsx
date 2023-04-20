import React from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../components/layouts/Navbar";
import Home from "../components/Home/Home";
import PageNotFound from "../components/layouts/PageNotFound";

const AppRoutes = () => (
  <React.Fragment>
    {/* CSS RESET by Material UI */}
    <CssBaseline />
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />​
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </React.Fragment>
);

export default AppRoutes;
