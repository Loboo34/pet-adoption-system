import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersPage from "./pages/userPage";
import PalorsPage from "./pages/PalorsPage";
import LoginPage from "./pages/LoginPage";

const App = function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/professional" element={<PalorsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
