import axios from "axios";
import Navigation from './global-components/Navigation';
import { ChangeEvent, useEffect, useState } from "react";

export default function HttpImage() {
    const [pickedCode, setPickedCode] = useState(0);

    const httpCodes = []

    for (let i = 100; i < 600; i++) {
        httpCodes.push(<option key={i} value={i} className="random_http_image--code_options"> {i} </option>)
    }

    function handleChange(params: ChangeEvent<HTMLInputElement>) {
        const { value } = params.target;
        setPickedCode(Number(value));
    }


    return (
        <div className="page_container--http_image_page">
            <Navigation />
            <main className="http_image_page--main_conent">

                <h1 className="main_content--page_title u-title">Gerador de imagem HTTP</h1>

                <form action="#" className="page_conent--image_form">
                    <label htmlFor="http_code_number" className="">Digite um código:  </label>
                    <input type="number"
                        min="2"
                        max="100"
                        name="http_code_picker"
                        id="http_code_number"
                        value={pickedCode}
                        onChange={handleChange}
                        className="random_http_image_page--http_code_picker" />
                </form>
                <img src={"https://http.cat/" + pickedCode} alt="" className="random_http_image_page--http_image" />
            </main>
        </div>
    )
}