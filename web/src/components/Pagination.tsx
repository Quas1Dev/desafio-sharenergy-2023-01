interface PaginationInterface {
    usersPerPage : number;
    totalUsers : number;
}

export default function Pagination({usersPerPage, totalUsers} : PaginationInterface){
    let controllers = [];
    for (let i = 1; i <= (Math.ceil(totalUsers / usersPerPage)); i++) {
        controllers.push(i);
    }

    const controlersIcons = controllers.map((controller) => {
        return <div className="pagination--controller">{controller}</div>
    });

    return (
        <div className="post_listing--pagination">
            {controlersIcons}
        </div>
    )
}