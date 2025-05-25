import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

const invalidCpfs = [
 "000000000",
 "111111111",
 "222222222",
 "333333333",
 "444444444",
 "555555555",
 "666666666",
 "777777777",
 "888888888",
 "999999999"
]

function validateFormat(cpf: string): boolean {
    if(new RegExp( "^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$").test(cpf)){
        return true;
    }
    return false;

}

function validateDigits(cpf:string): boolean {
    let formattedCpf = cpf.replace(/[^a-zA-Z0-9\s]/g, '');
    let digits: string = formattedCpf.substring(0, 9);
    let sum: number = 0;
    if (invalidCpfs.includes(digits))
    {
        return false;
    }
    let ct: number = 10;
    for(let digit of digits)
    {
        sum += (parseInt(digit) * ct);
        ct--;
    }
    let firstDigit: number;
    if (sum % 11 < 2)
        firstDigit = 0;

    else
        firstDigit = 11 - (sum % 11);

    digits += firstDigit.toString();

    ct = 11;
    sum = 0;

    for(let digit of digits)
    {
        sum += (parseInt(digit) * ct);
        ct--;
    }
    let secondDigit: number;
    if (sum % 11 < 2)
        secondDigit = 0;

    else
        secondDigit = 11 - (sum % 11);

    digits += secondDigit.toString();

    console.log(`DEBUG// digits: ${digits} | cpf: ${cpf} | formatted cpf: ${formattedCpf}`);
    if (digits == formattedCpf){
        return true;
    }
    return false;
}

export function IsValidCpf(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string)  =>
        registerDecorator({
            name: 'IsValidCpf',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(cpf: string, args: ValidationArguments) {
                    if(validateFormat(cpf) && validateDigits(cpf)){
                        return true;
                    }
                    return false;
                }
            }

        })
}
