import axios from "axios";
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Navigation from "./global-components/Navigation"
import AddUserForm from "./clients-components/AddUserForm";
import { Pencil, XCircle } from "phosphor-react";

interface ClientsInterface {
    name: string,
    cpf: string,
    address: string,
    email: string,
    telephone: string
}

export default function Clients() {
    const [clients, setClients] = useState<ClientsInterface[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const fetchClients = async () => {
        const response = await axios.get("http://localhost:3333/read");
        setClients(response.data);
    }

    useEffect(() => {
        fetchClients()
    }, []);

    function handleClickDelete(cpf: string) {
        const deleteClient = async () => {
            const response = await axios.delete("http://localhost:3333/delete/?cpf=" + cpf);
            fetchClients();
        }
        deleteClient();
    }

    function handleClickUpdate() { }

    function handleOpenCloseModal() {
        setIsOpen(prevOpenModal => !prevOpenModal);
    }

    return (
        <main className="page_container--main_ncontent">
            <Navigation />
            <h1 className="main_content--clients_page_title u-title">Clientes</h1>
            <p className="page_content--page_description u-description">A tabela abaixo mostra os dados de clientes que cadastramos em nosso banco de dados hospedado na núvem. Caso  nenhum cliente esteja cadastrado, um botão
                apenas adicione um novo usuário.</p>
            <button className="clients_page--add_user" onClick={handleOpenCloseModal}>Adicionar usuário</button>

            <ReactModal
                className="clients_page--modal_add_user"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                isOpen={isOpen}
                onRequestClose={handleOpenCloseModal}
            >
                <AddUserForm setIsOpen={setIsOpen} fetchClients={fetchClients} />
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
                                <th></th>
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
                                        <td>
                                            <Pencil />
                                            <XCircle onClick={(e) => handleClickDelete(client.cpf)} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </main>
        </main>
    )
}