import React from "react";
import { Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./context/context";
import { Home, Login, Register, TestPage, Warning, Error, Layout, Admin, LessonsPage } from './Pages'
import RequireAuth from "./Components/RequireAuth";





function App() {
  const { isRegister } = useGlobalContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="test" element={<TestPage />} />
          <Route path="warning" element={<Warning />} />

          {/* PROTECTED ROUTES */}

          <Route element={<RequireAuth check={false} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth check={true} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route path="/:level/:id" element={<LessonsPage />} />

          {/* CATCH ALL */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
