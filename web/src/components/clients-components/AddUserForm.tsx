import axios from "axios";
import FormFields from "./FormFields";
import { FormEvent, ChangeEvent, useState } from 'react';

export interface AddUserFormPropsinterface {
    setIsOpen: Function;
    fetchClients: Function;
}

export interface AddUserFormInterface {
    name: string,
    email: string,
    address: string,
    telephone: string,
    cpf: string,
    [key: string]: string;
}

export default function AddUserForm({ setIsOpen, fetchClients }: AddUserFormPropsinterface) {

    const [addUserForm, setAddUserForm] = useState<AddUserFormInterface>({
        name: "",
        email: "",
        address: "",
        telephone: "",
        cpf: "",
    })

    const [emptyField, setEmptyField] = useState<boolean>(false)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let key: keyof AddUserFormInterface;

        let emptyValue: boolean = false;
        for (key of Object.keys(addUserForm)) {
            if (addUserForm[key] == "") {
                setEmptyField(true);
                emptyValue = true;
            }
        }

        if (!emptyValue) {
            const addUser = async () => {
                const response = await axios.post("http://localhost:3333/add", addUserForm);
                setIsOpen(false);
                fetchClients()
            }

            addUser();
        }
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
        value = value.replace(/\D/g, "")
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        return value
    }

    return (
        <>
            <span className="modal_add_user--add_user_form_warning" style={{
                display: emptyField ? "block" : "none"
            }}>Por favor, preencha todos os campos obrigatórios</span>

            <form action="" className="modal_add_user--add_user_form" onSubmit={handleSubmit}>
                <FormFields handleChange={handleChange} clientForm={addUserForm}/>
                <button className="add_user_form--submit">Adicionar</button>
            </form>
        </>
    )
}