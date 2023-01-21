import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

function Login({user, setUser} : {user:string, setUser : Function}) {
    const [form, setForm] = useState({
        user: "",
        password: "",
        keepon: false,
    });

    const [showWarning, setShowWarning] = useState<boolean>(false);

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

    // Ask the server whether user exists;
    // Receive {_id: <some user id>} or {_id: null}
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const checkUser = async () => {
            const response = await axios.post("http://localhost:3333/confirmLogin", form);
            
            if (form.keepon) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            sessionStorage.setItem('user', JSON.stringify(response.data));

            // Display warning if no user is returned.
            if (!response.data._id) {
                setShowWarning(true);
            }

            setUser(JSON.stringify(response.data));
        }

        checkUser();
    }

    // Redirect logged in user to the "HTTP image" page
    if (user) {
        console.log("Cofirming user.");
        const checkAndUser = async ()=>{

           const loggedUser = JSON.parse(user);
           const response =  await axios.get("http://localhost:3333/confirmUser/" + loggedUser._id);
           const data = response.data;

           if (data._id) navigate("/randomuser");
        }
        checkAndUser();
    }

    return (
        <div className="page_container--login_page">
            <main className="login_page--main_content" >
                {showWarning && <span className="login_box--warning">Usuário ou senha incorretos! Por favor, tente novamente.</span>}
                
                <h1 className="main_content--login_page_title u-title">Login</h1>
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
                        <input type="checkbox" 
                        name="keepon" 
                        checked={form.keepon} 
                        onChange={handleChange}
                        />
                        <label htmlFor="keepon"
                            className="keepon--label">Mantenha-me conectado</label>

                    </div>

                    <button className="login_form--submit">Fazer login</button>
                </form>

            </main>
        </div>
    )
}

export default Login;


/*
Dev's comments

*1 - The user is set to null in case the login was unsuccessful.
We need React to refresh when this is the case so we may display 
the warning.
*/