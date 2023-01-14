import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function LoginForm() {
    // Form data is kept here.
    const [form, setForm] = useState({
        user: "",
        password: "",
        keepon: false,
    });

    // User id from database should be kept here.
    const [user, setUser] = useState();

    // Control form data update.
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let { name, value, type, checked } = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    // This should be used to navegate to another page.
    const navigate = useNavigate();

    // Here we communicate to our server.
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        axios.post("http://localhost:3333/confirmLogin", form).then(resp => {
            console.log(JSON.stringify(resp.data))
            setUser(resp.data);
            if (form.keepon) {
               localStorage.setItem('user', JSON.stringify(resp.data));
            }
        });
    }

    function saveUser(data: any) {
        window.localStorage.setItem("user", data);
    }

    // If user has alreaady loagged in, and we saved its info
    // in the local storage, we retrieve the user's info to our
    // user state, which is used to decide whether we 
    // display this component or not.
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");

        if (loggedInUser) {

            const foundUser = JSON.parse(loggedInUser);

            setUser(foundUser);
        }
    }, [])

    // If there is a user logged in, we send the user to the next page.
    // if (user) {
    //     console.log("redirecting");
    //     navigate("/randomuser");
    // }

    return (
        <main className="login_box" >
            {!user && <span className="login_box--warning">Usuário ou senha incorretos! Por favor, tente novamente.</span>}
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
            
        </main>
    )
}

export default LoginForm;
