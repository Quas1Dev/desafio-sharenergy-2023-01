import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

function Login({user, setUser} : {user:string, setUser : Function}) {
    // Form data is kept here.
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

    // Here we communicate to our server.
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const checkUser = async () => {

            const response = await axios.post("http://localhost:3333/confirmLogin", form);
            
            if (form.keepon) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            if (!response.data._id) {
                setShowWarning(true);
            }

            setUser(JSON.stringify(response.data));
        }


        checkUser();
    }

    /* 
      This should make the user "always on" *2
    */
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        console.log("Logged user:", loggedInUser);
        if (loggedInUser) {
           setUser(loggedInUser);
        } else {
           setUser(JSON.stringify({_id: null}));
        }
    },[])

    // Redirect logged in user.
    if (user) {
        console.log("Cofirming user.");
        const checkUser = async ()=>{
           const loggedUser = JSON.parse(user);
           const response =  await axios.get("http://localhost:3333/confirmUser/" + loggedUser._id);
           const data = response.data;
           if (data._id) {
            navigate("/randomuser");
           } 
            
        
        }

        checkUser();
    }
    console.log("User:",user)
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

                    <button className="login_form--submit">Enviar</button>
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

*2 - If user has already logged in, and we saved its info
in the local storage, we retrieve the user's info to our
user state, which is used to decide whether we display 
this component or not.
*/