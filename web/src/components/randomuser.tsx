import { useEffect, useState } from "react"
import axios from "axios"
import Navigation from "./Navigation"
import { nanoid } from "nanoid";
import UsersDisplay from "./UsersDisplay";
import { RandomUserData } from "./Card";
import Pagination from './Pagination';

export default function RandomUser() {
    const [randomUsers, setRandomUsers] = useState<RandomUserData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(8);

    useEffect(() => {
        axios.get("https://randomuser.me/api/?results=40")
            .then(resp => {
                const res = resp.data.results;

                for (let i = 0; i < res.length; i++) {
                    setRandomUsers(prevRandomUsers => {
                        const user: any = {
                            name: res[i].name.first + " " + res[i].name.last,
                            age: res[i].registered.age,
                            email: res[i].email,
                            image: res[i].picture.medium,
                            username: res[i].login.username,
                            key: nanoid()
                        }

                        return [...prevRandomUsers, user]
                    })

                }
            });
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = randomUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className="page_container--random_user_page">
            <Navigation />
            <main className="random_user_page--page_content">
                <h1 className="page_content--page_title">Lista de Usuários</h1>
                <p className="page_content--page_description">As informações nessa lista de usuário foram geradas automáticamente usando a API  Random User Generator. Você pode usar a caixa de pesquisa para  procurar  por usuários especificos na lista.</p>

                <UsersDisplay users={currentUsers} />

                <Pagination totalUsers={randomUsers.length} usersPerPage={usersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
            </main>
        </div>
    )
}