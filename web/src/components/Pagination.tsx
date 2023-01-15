interface PaginationInterface {
    usersPerPage : number;
    totalUsers : number;
}

export default function Pagination({usersPerPage, totalUsers} : PaginationInterface){
    let pageNumbers = [];
    for (let i = 1; i <= (Math.ceil(totalUsers / usersPerPage)); i++) {
        pageNumbers.push(i);
    }

    const pageNumbersIcons = pageNumbers.map((controller) => {
        return <div className="pagination--controller">{controller}</div>
    });

    return (
        <div className="post_listing--pagination">
            {pageNumbersIcons}
        </div>
    )
}