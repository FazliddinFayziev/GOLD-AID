import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useGlobalContext } from "./context/context";
import { Home, Login, Register, TestPage, Warning, Error, Layout, Admin, LessonsPage } from './Pages'
import VideoPage from "./Pages/User/VideoPage";






function App() {
  const { isRegister } = useGlobalContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/warning" element={isRegister ? <Warning /> : <Navigate to="/register" />} />
          <Route path="test" element={isRegister ? <TestPage /> : <Navigate to="/register" />} />


          {/* PROTECTED ROUTES */}

          {/* <Route element={<RequireAuth check={false} />}> */}
          <Route path="/" element={<Home />} />
          {/* </Route> */}

          {/* <Route element={<RequireAuth check={true} />}> */}
          <Route path="admin" element={<Admin />} />
          {/* </Route> */}

          <Route path="/:level" element={<LessonsPage />} />

          <Route path="/:level/:lesson" element={<VideoPage />} />

          {/* CATCH ALL */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
