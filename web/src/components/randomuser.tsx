import { useEffect, useState } from "react"
import axios from "axios"
import Navigation from "./Navigation"
import Card, { RandomUserData } from "./Card";
import { nanoid } from "nanoid";

export default function RandomUser() {
    const [randomUsers, setRandomUsers] = useState<RandomUserData[]>([]);

    useEffect(() => {
        axios.get("https://randomuser.me/api/?results=56")
            .then(resp => {
                const res = resp.data.results;

                for (let i = 0; i < res.length; i++) {
                    setRandomUsers(prevRandomUsers => {

                        const user: any = {
                            name: res[i].name.first + " " + res[i].name.last,
                            age: res[i].registered.age,
                            email: res[i].email,
                            image: res[i].picture.medium,
                            user: res[i].login.username,
                            key: nanoid()
                        }

                        return [...prevRandomUsers, user]
                    })

                }
            });
    }, []);

    const userCards = randomUsers.map((user: RandomUserData) => {
        return <Card 
        name={user.name} 
        username={user.username} 
        email={user.email} 
        image={user.image}
        gender={user.gender} 
        age={user.age}
        key={user.key}/>
    })

    return (
        <div className="page_container--random_user_page">
            <Navigation />
            <main className="random_user_page--page_content">
                <h1 className="page_content--page_title">Lista de Usuários</h1>
                <p className="page_content--page_description">As informações nessa lista de usuário foram geradas automáticamente usando a API  Random User Generator. Você pode usar a caixa de pesquisa para  procurar  por usuários especificos na lista.</p>
                <div className="page_content--cards_listing">
                    {userCards}
                </div>
            </main>
        </div>
    )
}