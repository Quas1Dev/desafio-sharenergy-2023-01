import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function LoginForm() {

    const [form, setForm] = useState({
        user: "",
        password: "",
        keepon: false,
    });

    const [user, setUser] = useState();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let { name, value, type, checked } = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const navigate = useNavigate();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // const url = "http://localhost:3333/confirmLogin/?user=" + form.user + "&password=" + form.password;

        axios.post("http://localhost:3333/confirmLogin", form).then(resp => {
            console.log(JSON.stringify(resp.data))
            setUser(resp.data);
            localStorage.setItem('user', JSON.stringify(resp.data));
        });

        // fetch(url).then(resp => resp.json()).then(data => {
        //     setUser(data);
        // })
    }

    function saveUser(data: any) {
        window.localStorage.setItem("user", data);
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");

        if (loggedInUser) {

            const foundUser = JSON.parse(loggedInUser);

            setUser(foundUser);
        }
    }, [])

    // if (user) {
    //     console.log("redirecting");
    //     navigate("/randomuser");
    // }

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
            {!user && <span>Por favor, entre com usuário e senha válidos.</span>}
        </main>
    )
}

export default LoginForm;
