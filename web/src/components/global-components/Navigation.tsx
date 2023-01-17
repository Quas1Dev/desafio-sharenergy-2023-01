import { Link } from "react-router-dom"
export default function Navigation() {
    return (
        <nav className="site_menu">
            <ul className="site_menu--list_of_links">
                <li><Link to="/randomuser" className="list_of_links--link" > Lista de Usuários </Link></li>
                <li><Link to="/httpimage" className="list_of_links--link"> Gerador de imagem HTTP </Link></li>
                <li><Link to="/randomdog" className="list_of_links--link"> Cachorro aleatório </Link></li>
                <li><Link to="/randomusers" className="list_of_links--link"> CRUID </Link></li>
            </ul>
        </nav>
    )
}