import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function validateInput(elem: String) {
    for (let index = 0; index < 8; index++) {
        if (elem[index] == '') return false;
    }
    const currency = await prisma.currency.findUnique({where: {name: elem[10]}});
    console.log(currency)
    if (currency == null) return false;
    return true;
}
