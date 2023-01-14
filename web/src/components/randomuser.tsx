import { Link } from "react-router-dom"

export default function RandomUser() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/randomusers"> Lista de Usuários </Link></li>
                    <li><Link to="/randomusers"> Gerador de imagem HTTP </Link></li>
                    <li><Link to="/randomusers"> Cachorro aleatório </Link></li>
                    <li><Link to="/randomusers"> CRUID </Link></li>
                </ul>
            </nav>
            <main>
                <h1>Lista de Usuários</h1>
                <p>As informações nessa lista de usuário foram geradas automáticamente usando a API  Random User Generator. Você pode usar a caixa de pesquisa para  procurar  por usuários especificos na lista.</p>
            </main>
        </div>
    )
}