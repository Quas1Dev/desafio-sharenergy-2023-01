import { Link } from "react-router-dom";
import { useState, MouseEvent } from 'react';

export default function Navigation() {
    const [showMenu, setShowMenu] = useState(false);

    // Very important to correctly show the menu
    // on resize.
    window.addEventListener("resize", (e)=>{
        setShowMenu(false);
    })

    function handleClick (e: MouseEvent) {
        setShowMenu(prevShowMenu => !prevShowMenu)
    }

    function handleResize (e : any){
        console.log("False")
        setShowMenu(false);
    }

    return (
        <nav className="site_menu">
            <div className={"site_menu--toggle_menu_button toggle " + (showMenu ? "change" : "")}
            onClick={handleClick}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <ul className={"site_menu--list_of_links " + (showMenu ? "show" : "")}>
                <li><Link to="/randomuser" className="list_of_links--link" > Lista de Usuários </Link></li>
                <li><Link to="/httpimage" className="list_of_links--link"> Gerador de imagem HTTP </Link></li>
                <li><Link to="/randomdog" className="list_of_links--link"> Cachorro aleatório </Link></li>
                <li><Link to="/clients" className="list_of_links--link"> Clientes </Link></li>
            </ul>
        </nav>
    )
}