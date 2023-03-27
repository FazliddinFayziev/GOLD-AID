import React from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./Components/Loading";
import { Home, Login, Register, TestPage, Warning } from './Pages'




function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/warning" element={<Warning />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;
