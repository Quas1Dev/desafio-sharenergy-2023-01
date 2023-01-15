import Card, { RandomUserData } from "./Card";

interface UserDisplayInterface {
    users: RandomUserData[];
    loading: boolean;
}

export default function UsersDisplay({ users, loading }: UserDisplayInterface) {
    if (loading){
        return <h2>Carregando...</h2>
    }

    const userCards = users.map((user: RandomUserData) => {
        return <Card
            name={user.name}
            username={user.username}
            email={user.email}
            image={user.image}
            gender={user.gender}
            age={user.age}
            key={user.key} />
    })

    return (
        <div className="page_content--cards_listing">
            {userCards}
        </div>
    )
}