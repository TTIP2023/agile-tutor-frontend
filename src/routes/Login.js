import React, { useState, useContext } from "react";
import { Context } from '../context/Context.js';
import { Link } from "react-router-dom";
import "../Login.css";
import M from "materialize-css";
import logo from "../TIPLOGO.png"

const Login = () => {
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);
    const { loginTutor } = useContext(Context);

    const [inputsVisible, setInputsVisible] = useState([false, false])

    const toggleInputVisibility = (index) => {
        if (index === 0) {
            setInputsVisible([!inputsVisible[0], inputsVisible[1]])
        } else {
            setInputsVisible([inputsVisible[0], !inputsVisible[1]])
        }
    }

    const PostData = () => {
        if (!(email && password)) {
            M.toast({ html: "Se deben ingresar los datos solicitados", classes: "#c62828 red darken-3" });
        } else {
            loginTutor(email, password);
        }
    };

    return (
        <div className="loginRegisterCards">
            <div className="mycard">
                <div id="fondoTarjeta" className="card auth-card input-field tarjetaLogin hoverable">
                    <img alt="logo" className="logo-login" src={logo} />
                    <div className="warning-sign center" > Ingrese sus datos de acceso: </div>
                    <input
                        type="email"
                        id='inputLogin'
                        placeholder="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <div className="row" id='inputLoginPassWidth'>
                        <input
                            type={inputsVisible[0] ? 'text' : 'password'}
                            placeholder="password"
                            className='valdiate col s5'
                            id='inputLoginPass'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <button id='btnLoginPass' className='col s1' onClick={() => toggleInputVisibility(0)} >
                            {inputsVisible[0] ? <i className="material-icons small iconblack">remove_red_eye</i> : <i className="material-icons small">remove_red_eye</i>}
                        </button>
                        <br />
                    </div>
                    <button
                        id="botonLogin"
                        className="btn waves-effect waves-light"
                        onClick={() => PostData()}
                    >
                        Ingresar
                    </button>
                    <h5 id="H5Register">
                        <tr />
                        <Link id="linkRegister" to="/register">¿No te encuentras registrado?</Link>
                    </h5>
                </div>
            </div>
        </div>)
};

export default Login;