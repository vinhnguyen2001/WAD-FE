import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/auth/auth.register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/auth/sign-in" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
