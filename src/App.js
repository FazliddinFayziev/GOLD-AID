import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useGlobalContext } from "./context/context";
import { Home, VideoPage, Homework, Profile, Login, Register, TestPage, Warning, Error, Layout, Admin, LessonsPage, NotAllowed, Offline } from './Pages'
import { Verify, Verifying } from "./Components";






function App() {
  const { isRegister } = useGlobalContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="warning" element={isRegister ? <Warning /> : <Navigate to="/register" />} />
          <Route path="test" element={isRegister ? <TestPage /> : <Navigate to="/register" />} />
          <Route path="verify" element={<Verify />} />
          <Route path="verify/email/register/:token" element={<Verifying />} />

          {/* PROTECTED ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="user/:level" element={<LessonsPage />} />
          <Route path="user/:level/:lessonId" element={<VideoPage />} />
          <Route path="user/:level/:lessonId/:homework" element={<Homework />} />
          <Route path="/profile/:user" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<Admin />} />

        {/* Catch Error and such pages*/}
        <Route path="*" element={<Error />} />
        <Route path="/error" element={<Error />} />
        <Route path="/notallowed" element={<NotAllowed />} />
        <Route path="/offline" element={<Offline />} />
      </Routes>
    </>
  );
}

export default App;
