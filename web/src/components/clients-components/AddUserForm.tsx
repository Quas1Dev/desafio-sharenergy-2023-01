import axios from "axios";
import {FormEvent, ChangeEvent, useState} from 'react';

export default function AddUserForm() {
    const [addUserForm, setAddUserForm] = useState({
        name: "",
        email: "",
        address: "",
        telephone: "",
        cpf: "",
    })

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const addUser = async () => {
            const response = axios.post("http://localhost:3333/", addUserForm);
            console.log(response);
        }

        addUser();
    }


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let { name, value } = e.target;
        console.log(value)
        if (name == "telephone") {
            value = maskTelephone(value);
        } else if (name == "cpf") {
            value = maskCpf(value);
        }

        setAddUserForm(prevAddUserForm => {
            return {
                ...prevAddUserForm,
                [name]: value
            }
        })

    }

    function maskTelephone(value: string): string {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }

    function maskCpf(value: string): string {
        value = value.replace(/\D/g, "")                    //Remove tudo o que não é dígito
        value = value.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        value = value.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
        return value
    }
    return (
        <form action="" className="modal_add_user--add_user_form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input type="text"
                id="name"
                name="name"
                onChange={handleChange}
                className="add_user_form--field"
                value={addUserForm.name} />

            <label htmlFor="email">E-mail</label>
            <input type="text"
                id="email"
                name="email"
                onChange={handleChange}
                className="add_user_form--field"
                value={addUserForm.email} />

            <label htmlFor="telephone">Telefone</label>
            <input type="tel"
                id="telephone"
                name="telephone"
                maxLength={15}
                onChange={handleChange}
                className="add_user_form--field"
                value={addUserForm.telephone} />

            <label htmlFor="cpf">CPF</label>
            <input type="text"
                id="cpf"
                name="cpf"
                maxLength={14}
                onChange={handleChange}
                className="add_user_form--field"
                value={addUserForm.cpf} />

            <label htmlFor="address">Endereço</label>
            <input type="text"
                id="address"
                name="address"
                onChange={handleChange}
                className="add_user_form--field"
                value={addUserForm.address} />

            <button className="add_user_form--submit">Adicionar</button>
        </form>
    )
}