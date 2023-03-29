import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./Components/Loading";
import { useGlobalContext } from "./context/context";
import { Home, Login, Register, TestPage, Warning } from './Pages'




function App() {
  const { isRegister, isDone } = useGlobalContext();
  return (
    <>
      <Routes>
        <Route path="/" element={isDone ? <Home /> : <Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/warning" element={isRegister ? <Warning /> : <Navigate to="/register" />} />
        <Route path="/test" element={isRegister ? <TestPage /> : <Navigate to="/register" />} />
      </Routes>
    </>
  );
}

export default App;
