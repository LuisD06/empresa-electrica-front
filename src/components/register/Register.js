import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
export const Register = () => {
    const [userName, setUserName] = useState("");
    return (
        <>
            <div className="register-container center">
                <div className="register-header">
                    <div className="step-title">
                        <h2>REGISTRO</h2>
                    </div>
                    <div className="step-title">
                        
                    </div>
                </div>
                <div className="register-body">
                    <div className="form-step">
                        <label htmlFor="">Nombre completo</label>
                        <input type="text" name="userFullName" value={userName}/>
                        <label htmlFor="">Cédula</label>
                        <input type="text" name="userIdCard" />
                        <label htmlFor="">Dirección</label>
                        <input type="text" name="userAddress" />
                        <label htmlFor="">Correo</label>
                        <input type="text" name="userEmail" />
                        <div className="login-clue">
                            <p>¿Ya tiene una cuenta? <Link to={"/Login"}>Iniciar Sesión</Link></p>
                        </div>
                    </div>
                    <div className="form-step">
                        <label htmlFor="">Teléfono</label>
                        <input type="text" name="userPhone" />
                        <label htmlFor="userType">Tipo</label>
                        <select name="userType" id="">
                            <option value="0">Cliente</option>
                            <option value="1">Técnico</option>
                        </select>
                        <label htmlFor="">Contraseña</label>
                        <input type="password" name="userPasswordRegister" />
                        <label htmlFor="">Confirmar Contraseña</label>
                        <input type="password" name="userPasswordRegisterConfirm" />
                        <div className="register-action">
                            <a href="">Aceptar</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}