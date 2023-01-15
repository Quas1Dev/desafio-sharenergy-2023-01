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

        const checkUser = async () => {

            const response = await axios.post("http://localhost:3333/confirmLogin", form);

            setUser((prevUser) => {

                // React ^16 does not refresh when state is set to null.
                // So we map a null value to 0. *1

                if (response.data == null) {
                    response.data = 0;
                }

                if (form.keepon) {
                    console.log("Saving user ", response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                

                return response.data;
            });

        }


        checkUser();
    }

    /* 
      This should make the user "always on" *2
    */
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");

        if (loggedInUser) {

            const foundUser = JSON.parse(loggedInUser);

            setUser(foundUser);
        }
    }, [])

    // Redirect logged in user.
    if (user) {

        navigate("/randomuser");
    }

    return (
        <div className="page_container--login_page">
            <main className="login_box" >
                {user != undefined && user == 0 && <span className="login_box--warning">Usuário ou senha incorretos! Por favor, tente novamente.</span>}
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

export default LoginForm;


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