export default function HttpImage() {
    const httpCodes = []

    for (let i = 100; i < 600; i++) {
        <div> {httpCodes.push(i)} </div>
    }

    return (
        <div className="page_container--random_http_image">
            {httpCodes}
        </div>
    )
}