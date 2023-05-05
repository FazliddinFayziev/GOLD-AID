import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useGlobalContext } from "./context/context";
import { Home, Login, Register, TestPage, Warning, Error, Layout, Admin, LessonsPage } from './Pages'
import VideoPage from "./Pages/User/VideoPage";
import Homework from "./Pages/User/Homework";
import Profile from "./Pages/User/Profile";
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
          {/* const {access, refresh} = await axios.post('/verify', {token})
          if(accoes){ */}
          {/* // put on the global context 
            // put regresh in localstroagfe 
            // redirect to the home page 
          } */}

          {/* PROTECTED ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="user/:level" element={<LessonsPage />} />
          <Route path="user/:level/:lesson" element={<VideoPage />} />
          <Route path="user/:level/:lesson/:homework" element={<Homework />} />
          <Route path="/profile/:user" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<Admin />} />

        {/* Catch Error */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
