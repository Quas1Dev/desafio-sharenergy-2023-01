import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "./global-components/Navigation"

export default function Clients(){
    const [clients, setClients] = useState([]);
    
    useEffect(()=>{
        const fetchClients = async ()=>{
            const response = await axios.get("http://localhost:3333/fetchClients");
            setClients(response.data);
        }

        fetchClients()
    },[]);
    
    function handleClickDelete(){
        
    }

    function handleClickUpdate(){

    }

    function handleClickAdd(){

    }
    
    console.log(clients == [])
    return (
        <div className="page_container--clients_page">
            <Navigation />
            <h1 className="clients_page--title u-title">Clientes</h1>

            <button className="clients_page--add_user">Adicionar usuário</button>
            <main>
                { clients.length > 0 &&
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
                        return(
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