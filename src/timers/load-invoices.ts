import https from 'https';
import parse from 'csv-parse';
import { PrismaClient } from '@prisma/client';
import { validateInput } from "../validators/invoiceValidator";


const prisma = new PrismaClient();

export function fetchInvoices() {
    https.get(String(process.env.INVOICES_URL), (res) => {
        var data: Array<String> = [];
        res
        .pipe(parse({ delimiter: ','}))
        .on('data', (info) => data.push(info))
        .on('end', () => {
            data.shift();
            data.forEach(async (elem) => {
                if (await validateInput(elem)) {
                    try {
                        await prisma.invoice.create({
                            data: {
                                invoice_id: parseInt(""+elem[0]),
                                vendor_id: parseInt(""+elem[1]),
                                invoice_number: ""+elem[2],
                                invoice_date: new Date(""+elem[3]),
                                invoice_total: parseFloat(""+elem[4]),
                                payment_total: parseFloat(""+elem[5]),
                                credit_total: parseFloat(""+elem[6]),
                                bank_id: parseInt(""+elem[7]),
                                invoice_due_date: new Date(""+elem[8]),
                                payment_date: elem[9] == '' ? null : new Date(""+elem[9]),
                                currency_id: parseInt(""+elem[10]),
                            },
                        });
                    } catch (err) {
                        //console.log(err);
                    }
                }
            });
            console.log("Elementos cargados!")
        });
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
}
