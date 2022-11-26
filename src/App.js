import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Reports } from "./components/reports/Reports";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const [userContext, setUserContext] = useState({});
  const context = {userContext, setUserContext};

  return (
    <AuthContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<Layout/>}>
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;