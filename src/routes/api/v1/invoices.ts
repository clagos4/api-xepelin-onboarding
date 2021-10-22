import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:vendor?/:invoiceDate?/:currency?', async (req, res, next) => {
    const { vendor, invoiceDate, currency }: { [id: string] : String; } = req.params;
    let params: any = {};
    if (vendor) params.vendor_id = vendor;
    if (vendor) params.invoice_date = invoiceDate;
    console.log(params)
    var invoices = await prisma.invoice.findMany({ 
        select: {
            invoice_id: true,
            vendor_id: true,
            invoice_number: true,
            invoice_total: true,
            payment_total: true,
            credit_total: true,
            bank_id: true
        },
        where: params 
    });
    if (currency) {
        for (let index = 0; index < invoices.length; index++) {
            const element = invoices[index];
            await $.ajax({
                url: process.env.CURRENCY_API_URL,
                type: "get",
                success: (data) => {
                    invoices[index].payment_total = data;
                }
            })
        }
        invoices.forEach(async (invoice) => {
            await $.ajax({
                url: process.env.CURRENCY_API_URL,
                type: "get",
                success: (data) => {
                    
                }
            })
        })
    }
    res.status(200).send({message: JSON.stringify(invoices)});
})


export = router;