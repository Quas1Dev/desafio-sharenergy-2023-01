import axios from "axios";
import { useState, useEffect } from 'react';

import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import Navigation from "./global-components/Navigation"
import AddUserForm from "./clients-components/AddClientForm";
import UpdateUserForm from "./clients-components/UpdateUserForm";
import { Pencil, XCircle } from "phosphor-react";
import { ClientInterface } from "../interfaces/ClientsPageInterfaces";

export default function Clients() {
    const [clients, setClients] = useState<ClientInterface[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUpdOpen, setIsUpdOpen] = useState<boolean>(false);
    const [clientToUpdate, setClientToUpdate] = useState<ClientInterface>({
        name: "",
        email: "",
        address: "",
        telephone: "",
        cpf: "",
        _id: ""
    });

    const fetchClients = async () => {
        const response = await axios.get("http://localhost:3333/read");
        setClients(response.data);
    }

    useEffect(() => {
        fetchClients()
    }, []);

    function handleClickDelete(_id : string) {
        const deleteClient = async () => {
            const response = await axios.delete("http://localhost:3333/delete/" + _id);
            fetchClients();
        }
        deleteClient();
    }

    function handleClickUpdate(clientData : ClientInterface) {
        setClientToUpdate(clientData);
        setIsUpdOpen(prevIsUpdOpen => !prevIsUpdOpen);
     }

    function handleOpenCloseModal() {
        setIsOpen(prevOpenModal => !prevOpenModal);
    }

    function handleOpenCloseUpd() {
        setIsUpdOpen(prevIsUpdOpen => !prevIsUpdOpen);
    }

    return (
        <div className="page_container--clients_page">
            <Navigation />
            <main className=" clients_page--main_content u-page_body">
                <h1 className="main_content--clients_page_title u-title">Clientes</h1>
                <p className="page_content--page_description u-description">A tabela abaixo mostra os dados de clientes que cadastramos em nosso banco de dados hospedado na núvem. Caso  nenhum cliente esteja cadastrado, um botão
                    apenas adicione um novo usuário.</p>
                <button className="clients_page--add_user" onClick={handleOpenCloseModal}>Adicionar usuário</button>

                <ReactModal
                    className="clients_page--modal"
                    isOpen={isUpdOpen}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={handleOpenCloseUpd}>
                    <UpdateUserForm setIsUpdOpen={setIsUpdOpen} fetchClients={fetchClients} clientToUpdate={clientToUpdate} />
                </ReactModal>

                <ReactModal
                    className="clients_page--modal"
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    isOpen={isOpen}
                    onRequestClose={handleOpenCloseModal}
                >
                    <AddUserForm setIsOpen={setIsOpen} fetchClients={fetchClients} />
                </ReactModal>

                <div className="table_wrapper">
                {clients.length > 0 &&
                    <table className="clients_page--table_clients">
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
                                            <Pencil style={{cursor: "pointer"}}onClick={(e)=> handleClickUpdate({...client})} />
                                            <XCircle style={{cursor: "pointer"}}onClick={(e) => handleClickDelete(client._id)} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
                 </div>
            </main>
        </div>
    )
}