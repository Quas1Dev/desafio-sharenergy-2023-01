import { useEffect, useState } from "react"
import axios from "axios"
import Navigation from "./Navigation"

export default function RandomUser() {
    const [randomUsers, setRandomUsers] = useState();

    useEffect(()=>{
        axios.get("https://randomuser.me/api/?results=56")
        .then(resp => setRandomUsers(resp.data.results));
    },[])

    return (
        <div className="page_container--random_user_page">
            <Navigation/>
            <main>
                <h1 className="random_user_page--page_title">Lista de Usuários</h1>
                <p className="random_user_page--page_description">As informações nessa lista de usuário foram geradas automáticamente usando a API  Random User Generator. Você pode usar a caixa de pesquisa para  procurar  por usuários especificos na lista.</p>
            </main>
        </div>
    )
}