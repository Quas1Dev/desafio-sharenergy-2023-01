export interface ClientFormInterface {
    setIsOpen: Function;
    fetchClients: Function;
}

export interface ClientFormDataInterface {
    name: string,
    email: string,
    address: string,
    telephone: string,
    cpf: string,
    [key: string]: string;
}