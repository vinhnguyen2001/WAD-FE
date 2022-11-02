import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/auth/auth.register";
import SignIn from "./components/auth/auth.signin";
import Accounts from "./components/account/account.info";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/account/information" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
