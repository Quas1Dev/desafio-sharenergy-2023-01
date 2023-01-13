import LoginField from "./loginfield";
import { FormEvent, useEffect, useState } from "react";

function LoginForm() {
    let [form, setForm] = useState({
        usuario: "",
        senha: "",
        keepon: false,
    });

    function handleChange(e: FormEvent) {
        let { name, value, type, checked } = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        
    }


    return (
        <main className="login_box">
            <h1 className="login_box--title">Login</h1>
            <form action="" className="login_box--login_form">
                <div>
                    <label htmlFor="usuario" className="login_form--field_name">Usuário:</label>
                    <input type="text"
                        name="usuario"
                        className="login_form--text_field"
                        onChange={handleChange}
                        value={form.usuario} />
                </div>

                <div>
                    <label htmlFor="senha" className="login_form--field_name">Senha:</label>
                    <input type="password"
                        name="senha"
                        className="login_form--text_field"
                        value={form.senha}
                        onChange={handleChange} />
                </div>

                <div className="login_form--keepon">
                    <input type="checkbox" name="keepon" />
                    <label htmlFor="keepon"
                        className="keepon--label"
                        value={form.keepon}
                        onChange={handleChange}>Mantenha-me conectado</label>
                </div>
                <button className="login_form--submit">Enviar</button>
            </form>
        </main>
    )
}

export default LoginForm;
