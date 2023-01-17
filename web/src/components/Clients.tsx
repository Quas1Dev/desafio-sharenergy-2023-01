import axios from "axios";
import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Navigation from "./global-components/Navigation"
import AddUserForm from "./clients-components/AddUserForm";

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const fetchClients = async () => {
            const response = await axios.get("http://localhost:3333/read");
            setClients(response.data);
        }

        fetchClients()
    }, []);

    function handleClickDelete() { }

    function handleClickUpdate() { }

    function handleOpenCloseModal() {
        setIsOpen(prevOpenModal => !prevOpenModal);
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
                <AddUserForm />
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
                        <tbody>
                        {clients.map(client => {
                            return (
                                <tr key={client.cpf}>
                                    <td>{client.name}</td>
                                    <td>{client.telephone}</td>
                                    <td>{client.email}</td>
                                    <td>{client.cpf}</td>
                                    <td>{client.address}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                }
            </main>
        </div>
    )
}