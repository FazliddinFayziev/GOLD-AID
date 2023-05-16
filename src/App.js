import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useGlobalContext } from "./context/context";
import { Home, VideoPage, Homework, Profile, Login, Register, TestPage, Warning, Error, Layout, Admin, LessonsPage, NotAllowed, Offline, Choose, Passed, Already, Failed } from './Pages'
import { Verify, Verifying } from "./Components";






function App() {
  const { isRegister, checkAdmin } = useGlobalContext();
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
          <Route path="/choose" element={checkAdmin ? <Choose /> : <Navigate to="/login" />} />

          {/* PROTECTED ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="user/:level" element={<LessonsPage />} />
          <Route path="user/:level/:lessonId" element={<VideoPage />} />
          <Route path="user/:level/homework/:lessonId" element={<Homework />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="/:level/success" element={<Passed />} />
          <Route path="/:level/already" element={<Already />} />
          <Route path="/:level/failed" element={<Failed />} />
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
