import axios from "axios";
import { ChangeEvent, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Navigation from "./global-components/Navigation"

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

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

    function handleChange (e : ChangeEvent<HTMLInputElement>) {

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
                <form action="modal_add_user--add_user_form">
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name"  className="add_user_form--field"/>
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" className="add_user_form--field"/>
                    <label htmlFor="telephone">Telefone</label>
                    <input type="tel" id="telephone" maxLength={15} onChange={handleChange}  className="add_user_form--field"/>
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" className="add_user_form--field"/>
                    <label htmlFor="address">Endereço</label>
                    <input type="text" id="address" className="add_user_form--field"/>
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