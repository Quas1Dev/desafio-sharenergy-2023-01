import { ClientInterface } from "../interfaces/ClientsPageInterfaces";

export function isEmpty(obj: ClientInterface): boolean {
    let key: keyof ClientInterface;

    for (key of Object.keys(obj)) {
        if (obj[key] == "" && key != "_id") {
            return true;
        }
    }
    console.log("I'm returning false")
    return false;
}

export default function validate(obj: ClientInterface) {
    const cpfValid: boolean = checkCpf(obj.cpf);
    const telephoneValid: boolean = checkTelephone(obj.telephone);

    return cpfValid && telephoneValid;
}

function checkCpf(strCPF: string): boolean {
    strCPF = strCPF.replace(/\D/g, '');
    console.log(strCPF)
    if (strCPF.length != 11 ||
        strCPF == "00000000000" ||
        strCPF == "11111111111" ||
        strCPF == "22222222222" ||
        strCPF == "33333333333" ||
        strCPF == "44444444444" ||
        strCPF == "55555555555" ||
        strCPF == "66666666666" ||
        strCPF == "77777777777" ||
        strCPF == "88888888888" ||
        strCPF == "99999999999")
        return false;

    var sum: number;
    var remainder: number;
    sum = 0;
    if (strCPF == "00000000000") return false;

    for (let i: number = 1; i <= 9; i++) {
        sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder == 10) || (remainder == 11)) {
        remainder = 0;
    }

    if (remainder != parseInt(strCPF.substring(9, 10))) {
        return false;
    }

    sum = 0;
    for (let i: number = 1; i <= 10; i++) {
        sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder == 10) || (remainder == 11)) remainder = 0;
    if (remainder != parseInt(strCPF.substring(10, 11))) return false;
    console.log("I'm returning false")
    return true;
}

function checkTelephone(phone: string) {
    phone = phone.replace(/\D/g, '');

    if (!(phone.length >= 10 && phone.length <= 11)) return false;

    if (phone.length == 11 && parseInt(phone.substring(2, 3)) != 9) return false;

    for (var i: number = 0; i < 10; i++) {
        if (phone == new Array(11).join("" + i) || phone == new Array(12).join("" + i)) return false;
    }

    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];

    if (codigosDDD.indexOf(parseInt(phone.substring(0, 2))) == -1) return false;

    if (new Date().getFullYear() < 2017) return true;
    if (phone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(phone.substring(2, 3))) == -1) return false;

    return true;
}