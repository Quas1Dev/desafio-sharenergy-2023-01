import axios from "axios";
import { ChangeEvent, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Navigation from "./global-components/Navigation"

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [addUserForm, setAddUserForm] = useState({
        name: "",
        email: "",
        address: "",
        telephone: "",
        cpf: "",
    })

    useEffect(() => {
        const fetchClients = async () => {
            const response = await axios.get("http://localhost:3333/fetchClients");
            setClients(response.data);
        }

        fetchClients()
    }, []);

    function handleClickDelete() {

    }

    function handleClickUpdate() {

    }

    function handleClickAdd() {

    }

    function handleOpenCloseModal() {
        setIsOpen(prevOpenModal => !prevOpenModal);
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
        <div className="page_container--clients_page">
            <Navigation />
            <h1 className="clients_page--title u-title">Clientes</h1>

            <button className="clients_page--add_user" onClick={handleOpenCloseModal}>Adicionar usuário</button>

            <ReactModal
                className="clients_page--modal_add_user"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                isOpen={isOpen}
                onRequestClose={handleOpenCloseModal}
            >
                <form action="" className="modal_add_user--add_user_form">
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
            </ReactModal>

            <main>
                {clients.length > 0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>E-mail</th>
                                <th>CPF</th>
                                <th>Endereço</th>
                            </tr>
                        </thead>

                        {clients.map(client => {
                            return (
                                <tr>
                                    <td>client.name</td>
                                    <td>client.telephone</td>
                                    <td>client.email</td>
                                    <td>client.cpf</td>
                                    <td>client.address</td>
                                </tr>
                            )
                        })}
                    </table>
                }
            </main>
        </div>
    )
}