import { User, IdentificationBadge, Envelope, Calendar } from 'phosphor-react'

export interface RandomUserData {
    name: string;
    email: string;
    image: string;
    username: string;
    age: Number;
    gender: string;
    key: string;
}

export default function Card(props: RandomUserData) {
    console.log("props username:", props.username)
    return (
        <div className="card_listing--user_card">
            <div className="user_card--user_image">

                <img src={props.image} alt="Foto do usuário." />

            </div>
            <div className="user_card--user_infos">
                <span className="user_infos--info">{"Nome: " + props.name}</span>
                <span className="user_infos--info">{"E-mail: " + props.email}</span>
                <span className="user_infos--info">{"Usuário: " + props.username}</span>
                <span className="user_infos--info">{"Idade: " + props.age}</span>
            </div>
        </div>
    )
}