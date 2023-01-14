import Navigation from "./Navigation"

export default function RandomUser() {
    return (
        <div className="page_container--random_user_page">
            <Navigation/>
            <main>
                <h1>Lista de Usuários</h1>
                <p>As informações nessa lista de usuário foram geradas automáticamente usando a API  Random User Generator. Você pode usar a caixa de pesquisa para  procurar  por usuários especificos na lista.</p>
            </main>
        </div>
    )
}