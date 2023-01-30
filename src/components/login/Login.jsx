import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import axios from "../api/axios";
import brand from './../../assets/img/brand.png'
const LOGIN_URL = "/usuario/login";
export const Login = () => {
    const navigate = useNavigate();
    const userRef = useRef(null);
    const errorRef = useRef(null);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const { userContext, setUserContext } = useContext(AuthContext);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ "cedula": user, "clave": password }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(JSON.stringify(response?.data));
            const { status, data } = response?.data;
            console.log(status, data);
 
            if (status) {
                setUserContext(data);
                if (data.tipo === 'operador') {
                    navigate("/user/reports");
                }else {
                    navigate("/user/dashboard");
                }
            }
           
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
                        <img src={brand} alt="logo.png" />
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
                                <button  className="submit">Entrar</button>
                            </div>
                            {/* <p>¿No tiene una cuenta? <a href="">Registrarse</a></p> */}
                            <div className='login-wrapper'>
                                <p ref={errorRef} className={errorMessage ? "errorMessage" : "hidenMessage"} aria-live="assertive">{errorMessage}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Outlet></Outlet>
        </>
    );
}
