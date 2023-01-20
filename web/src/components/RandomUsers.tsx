import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios";
import { nanoid } from "nanoid";
import { RandomUserData } from "./random-users-page-components/Card";

import Navigation from './global-components/Navigation'
import UsersDisplay from "./random-users-page-components/UsersDisplay";
import Pagination from "./random-users-page-components/Pagination";
import SearchBox from "./random-users-page-components/SearchBox";

export default function RandomUser() {
    const [randomUsers, setRandomUsers] = useState<RandomUserData[]>([]);
    const [searchList, setSearchList] = useState<RandomUserData[]>([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(8);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const response = await axios.get("https://randomuser.me/api/?results=40");
            const usersList = response.data.results;
            setLoading(false);

            for (let i = 0; i < usersList.length; i++) {
                setRandomUsers(prevRandomUsers => {
                    const user: any = {
                        name: usersList[i].name.first + " " + usersList[i].name.last,
                        age: usersList[i].registered.age,
                        email: usersList[i].email,
                        image: usersList[i].picture.medium,
                        username: usersList[i].login.username,
                        gender: usersList[i].gender,
                        key: nanoid()
                    }

                    return [...prevRandomUsers, user]
                })

            }

        }
        fetchUsers();
    }, []);


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = searchList.length == 0 ?
        randomUsers.slice(indexOfFirstUser, indexOfLastUser) :
        searchList.slice(indexOfFirstUser, indexOfLastUser);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchList((prevSearchList) => {
            let newRandomUsers = randomUsers.filter((randomUser) => {
                if (randomUser.name.toLowerCase().match(value.toLowerCase()) ||
                    randomUser.email.toLowerCase().match(value.toLowerCase()) ||
                    randomUser.username.toLowerCase().match(value.toLowerCase())) {
                    return randomUser;
                }
            });
            return newRandomUsers;
        });

        setSearchInput(value);
    }

    return (
        <div className="page_container--random_user_page">
            <Navigation />

            <main className="random_user_page--main_content u-page_body">
                <h1 className="main_content--random_user_page u-title">Lista de Usuários</h1>
                <p className="page_content--page_descriptio u-description">As informações nessa lista de usuário foram geradas automáticamente usando a API  Random User Generator. Você pode usar a caixa de pesquisa para  procurar  por usuários especificos na lista.</p>

                <SearchBox handleChange={handleChange} searchInput={searchInput} />

                <UsersDisplay users={currentUsers} loading={loading} />

                <Pagination totalUsers={searchList.length == 0 ? randomUsers.length : searchList.length} usersPerPage={usersPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
            </main>
        </div>
    )
}