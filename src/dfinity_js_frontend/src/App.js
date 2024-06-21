import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import ShelterLogin from "./pages/shelter/Login";
import UsersLogin from "./pages/user/LoginPage";
import PetInfo from "./pages/user/PetInfo";

const App = function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/shelter" element={<ShelterLogin />} />
          <Route exact path="/users" element={<UsersLogin />} />
          <Route path="/petInfo" element={<PetInfo />} />
        {/* <Route path="/users" element={<UsersPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
