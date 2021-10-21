import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:vendor?:invoice_date?:currency?', (req, res, next) => {
    // const { vendor, invoice_date, currency } = req.params;
    // var messageDetails = (vendor ? 'with vendor, ' : 'without vendor, ') + 
    //     (invoiceDate ? 'with invoiceDate y ' : 'without invoiceDate y ') + 
    //     (currency ? 'with currency, ' : 'without currency.');
    
    var messageDetails = ""

    // if (!vendor) {messageDetails}

    res.send({
        message: 'Should return invoiceId, vendorId, invoiceNumber, invoiceTotal, paymentTotal, creditTotal y bankId.' + messageDetails
    })
})

export = router;