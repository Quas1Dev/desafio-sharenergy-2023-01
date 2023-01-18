import { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from './global-components/Navigation';

export default function RandomDog() {
    const [image, setImage] = useState()

    useEffect(()=>{
        const fetchDog = async()=>{
            const response = await axios.get("https://random.dog/woof/?include=jpg");
            console.log(response.data)
            setImage(response.data)
        }
        fetchDog();
    },[])

    return (
        <div className="page_container--random_dog_page">
            <Navigation />
            <main className='random_dog_page--main_content'>
                <h1 className="main_content--random_dog_page_title u-title">Cachorro aleatório</h1>

                <img src={"https://random.dog/" + image} className="random_dog_page--image" alt="Imagem aleatória de cachorro ou cachorros gerada pela API Random Dogs."/>

            </main>


        </div>
    )
}