import { useContext } from 'react';
import { BrowserRouter, Route, Routes, HashRouter as Router } from "react-router-dom";
import { ManageMedidorAdmin } from '../components/pages/manage-medidor-admin/manage-medidor-admin';
import RegisterMedidorAdmin from '../components/pages/register-medidor-admin/register-medidor-admin';
import RegisterUserAdmin from '../components/pages/register-user-admin/register-user-admin';
import { AuthContext } from '../context/AuthProvider';
import { Dashboard } from "./../components/dashboard/Dashboard";
import Layout from "./../components/layout/Layout";
import { Login } from "./../components/login/Login";
import { Reports } from './../components/pages/reports/reports';
const MainNavigation = () => {
  const { userContext } = useContext(AuthContext);
  return (
    <Router >
      <Routes >
        <Route  path="/" element={<Login />} />
        <Route path="/user" element={<Layout />}>
          {
            userContext.tipo === 'operador' ?
            <>
              <Route path="/user/reports" element={<Reports />} />
              <Route path="/user/register-medidor" element={<RegisterMedidorAdmin />} />
              <Route path="/user/register-user" element={<RegisterUserAdmin />} />
              <Route path="/user/manage-medidor" element={<ManageMedidorAdmin />} />
            </> :
            <Route path="/user/dashboard" element={<Dashboard />} />
          }
        </Route>
      </Routes>
    </Router>
  );
}
export default MainNavigation;