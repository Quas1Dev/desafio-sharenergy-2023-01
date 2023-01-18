import axios from "axios";
import FormFields from "./FormFields";
import { FormEvent, ChangeEvent, useState } from 'react';
import { maskTelephone, maskCpf} from '../../utils/Masks';
import { ClientFormInterface, ClientFormDataInterface } from "../../types/CustomTypes";


export default function ClientForm ({ setIsOpen, fetchClients }: ClientFormInterface) {

    const [clientFormData, setClientFormData] = useState<ClientFormDataInterface>({
        name: "",
        email: "",
        address: "",
        telephone: "",
        cpf: "",
    })

    const [emptyField, setEmptyField] = useState<boolean>(false)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let key: keyof ClientFormDataInterface;

        let emptyValue: boolean = false;
        for (key of Object.keys(clientFormData)) {
            if (clientFormData[key] == "") {
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
                <FormFields handleChange={handleChange} clientForm={clientFormData}/>
                <button className="add_user_form--submit">Adicionar</button>
            </form>
        </>
    )
}