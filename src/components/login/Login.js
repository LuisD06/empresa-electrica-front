import React, { useEffect, useRef, useState, useContext } from "react";
import AuthContext from '../../context/AuthProvider';
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "../api/axios";
const LOGIN_URL = "/consumidor/login";
export const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef(null);
    const errorRef = useRef(null);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({"usuario": user,"contrasena": password}),
                {
                    headers: {
                        'Content-Type':'application/json',
                    },
                    // withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const { status, message } = response?.data;
            console.log(status);
            // TODO: Validar jwt
            if (status) {
                navigate("/dashboard");
            }
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({ user, password, roles, accessToken});
            // setUser('');
            // setPassword('');
            // setSuccess(true);
        } catch (error) {
            if (!error.response) {
                setErrorMessage('No server response');
            } else if (error.response?.status === 400) {
                setErrorMessage('Missing username or password')
            } else if (error.response?.status === 401) {
                setErrorMessage('Unaunthorized')
            } else {
                setErrorMessage('Login Failed');
            }
            errorRef.current.focus();
        }

        
    }

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [user, password]);

    return (
        <>
            <div className="background">
                <div className="login-container center">
                    <div className="logo-container">
                        <img src="https://www.ccelrecreo.com/wp-content/uploads/2021/11/empresa-electrica-quito600x600.png" alt="logo.png" />
                    </div>
                    <div className="form-container">
                        <h2>LOGIN</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="userName">Nombre de usuario</label>
                                <input 
                                    type="text" 
                                    name="userName" 
                                    id="username"
                                    ref={userRef}
                                    value={user}
                                    onChange={(evt) => setUser(evt.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userPassword">Contraseña</label>
                                <input 
                                    type="password" 
                                    name="userPassword" 
                                    id="userpassword"
                                    ref={userRef}
                                    value={password}
                                    onChange={(evt) => setPassword(evt.target.value)}
                                />
                            </div>
                            <div className="form-action-group">
                                {/* <a href="">Entrar</a> */}
                                {/* <Link to="/dashboard">Entrar</Link> */}
                                <button className="submit">Entrar</button>
                            </div>
                            {/* <p>¿No tiene una cuenta? <a href="">Registrarse</a></p> */}
                            <p>¿No tiene una cuenta? <Link to="/register">Registrarse</Link></p>
                            <p ref={errorRef} className={errorMessage ? "errorMessage" : "hidenMessage"} aria-live="assertive">{errorMessage}</p>
                        </form>
                    </div>
                </div>
            </div>
            <Outlet></Outlet>
        </>
    );
}
