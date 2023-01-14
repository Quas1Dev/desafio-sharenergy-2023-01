import LoginField from "./loginfield";
import { FormEvent , useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom'

function LoginForm() {

    const [form, setForm] = useState({
        user: "",
        password: "",
        keepon: false,
    });

    const [userDenied, setUserDenied] = useState(false)

    function handleChange(e: ChangeEvent<HTMLInputElement> ) {
        let { name, value, type, checked } = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const navigate = useNavigate();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const url = "http://localhost:3333/confirmLogin/?user=" + form.user + "&password=" + form.password;
        
        fetch(url).then(resp => resp.json()).then(data => {


            if (data["isRegistered"]) {
                saveUser(data)
                navigate('/httpimage');
            } else {
                setUserDenied(true);
            }
        })
    }

    function saveUser(data: any ){
        window.localStorage.setItem("user", data);
    }
    /*
    // if (!userDenied) {
    //     console.log("redirecting")
    //     navigate("/httpimage")
    // }
    */

    return (
        <main className="login_box" >
            <h1 className="login_box--title">Login</h1>
            <form action="#" className="login_box--login_form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user" className="login_form--field_name">Usuário:</label>
                    <input type="text"
                        name="user"
                        className="login_form--text_field"
                        onChange={handleChange}
                        value={form.user} />
                </div>

                <div>
                    <label htmlFor="password" className="login_form--field_name">Senha:</label>
                    <input type="password"
                        name="password"
                        className="login_form--text_field"
                        value={form.password}
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
            {userDenied && <span>Por favor, entre com usuário e senha válidos.</span>}
        </main>
    )
}

export default LoginForm;
