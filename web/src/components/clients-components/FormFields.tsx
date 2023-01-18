import { ClientFormDataInterface } from '../../types/CustomTypes';
import { ChangeEventHandler } from "react"

interface FormFieldsInterface {
    handleChange: ChangeEventHandler<HTMLInputElement>
    clientForm: ClientFormDataInterface;
}

export default function FormFields({ handleChange, clientForm } : FormFieldsInterface) {
    return (
        <>
            <label htmlFor="name">Nome</label>
            <input type="text"
                id="name"
                name="name"
                onChange={handleChange}
                className="add_user_form--field"
                value={clientForm.name} />

            <label htmlFor="email">E-mail</label>
            <input type="text"
                id="email"
                name="email"
                onChange={handleChange}
                className="add_user_form--field"
                value={clientForm.email} />

            <label htmlFor="telephone">Telefone</label>
            <input type="tel"
                id="telephone"
                name="telephone"
                maxLength={15}
                onChange={handleChange}
                className="add_user_form--field"
                value={clientForm.telephone} />

            <label htmlFor="cpf">CPF</label>
            <input type="text"
                id="cpf"
                name="cpf"
                maxLength={14}
                onChange={handleChange}
                className="add_user_form--field"
                value={clientForm.cpf} />

            <label htmlFor="address">Endereço</label>
            <input type="text"
                id="address"
                name="address"
                onChange={handleChange}
                className="add_user_form--field"
                value={clientForm.address} />
        </>
    )
}