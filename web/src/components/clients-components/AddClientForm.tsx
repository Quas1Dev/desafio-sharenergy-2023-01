import axios from "axios";
import FormFields from "./FormFields";
import { FormEvent, ChangeEvent, useState } from 'react';
import { maskTelephone, maskCpf} from '../../utils/Masks';
import { AddClientFormPropsInterface, ClientInterface } from "../../interfaces/ClientsPageInterfaces";


export default function AddClientForm ({ setIsOpen, fetchClients }: AddClientFormPropsInterface) {

    const [clientFormData, setClientFormData] = useState<ClientInterface>({
        name: "",
        email: "",
        address: "",
        telephone: "",
        cpf: "",
        _id: ""
    })

    const [emptyField, setEmptyField] = useState<boolean>(false)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        let key: keyof ClientInterface;

        let emptyValue: boolean = false;
        console.log("Keys: ", Object.keys(clientFormData));
        for (key of Object.keys(clientFormData)) {
            // console.log("Key empty: ", key)
            if (clientFormData[key] == "" && key !="_id") {
                console.log("Key:", clientFormData[key])
                setEmptyField(true);
                emptyValue = true;
            }
        }

        if (!emptyValue) {
            const addUser = async () => {
                const response = await axios.post("http://localhost:3333/add", clientFormData);
                setIsOpen(false);
                fetchClients()
            }

            addUser();
        }
    }


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let { name, value } = e.target;

        if (name == "telephone") {
            value = maskTelephone(value);
        } else if (name == "cpf") {
            value = maskCpf(value);
        }

        setClientFormData(prevClientFormData => {
            return {
                ...prevClientFormData,
                [name]: value
            }
        })

    }

    return (
        <>
            <span className="modal_add_user--add_user_form_warning" style={{
                display: emptyField ? "block" : "none"
            }}>Por favor, preencha todos os campos obrigatórios</span>

            <form action="" className="modal_add_user--add_user_form" onSubmit={handleSubmit}>
                <FormFields handleChange={handleChange} clientData={clientFormData}/>
                <button className="add_user_form--submit">Adicionar</button>
            </form>
        </>
    )
}