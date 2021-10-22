import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:vendor?/:invoiceDate?/:currency?', async (req, res, next) => {
    const { vendor, invoiceDate, currency }: { [id: string] : String; } = req.params;
    console.log(vendor, invoiceDate, currency)
    let params: any = {};
    if (vendor) params.vendor_id = parseInt(""+vendor);
    if (invoiceDate) params.invoice_date = { gt: new Date(""+invoiceDate) }

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

    res.status(200).send({message: JSON.stringify(invoices)});
})

router.post('/create', async (req, res) => {
    
    const currency = await prisma.currency.findUnique({
        where: { name: req.body.currency}
    })
    const bank = await prisma.bank.findUnique({
        where: { bank_id: parseInt(req.body.bank_id)}
    })
    if (currency === null || bank === null) {
        res.status(400).send({message: 'Bad request: correct your params'});
        return;
    }
    await prisma.invoice.create({
        data: {
            invoice_id: parseInt(req.body.invoice_id),
            vendor_id: parseInt(req.body.vendor_id),
            invoice_number: req.body.invoice_number,
            invoice_date: new Date(req.body.invoice_date),
            invoice_total: parseFloat(req.body.invoice_total),
            payment_total: parseFloat(req.body.payment_total),
            credit_total: parseFloat(req.body.credit_total),
            bank_id: parseInt(req.body.bank_id),
            invoice_due_date: new Date(req.body.invoice_due_date),
            payment_date: new Date(req.body.payment_date),
            currency_id: currency!.id,
        },
    });
    res.status(201).send({message: 'Client registred successfully!'});
})


export = router;