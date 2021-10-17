const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/:vendor?:invoice_date?:currency?', (req, res, next) => {
    var vendor = req.params.vendor;
    var invoiceDate = req.params.invoice_date;
    var currency = req.params.currency;
    var messageDetails = (vendor ? 'with vendor, ' : 'without vendor, ') + 
        (invoiceDate ? 'with invoiceDate y ' : 'without invoiceDate y ') + 
        (currency ? 'with currency, ' : 'without currency.');

    if (!vendor) {messageDetails}

    res.send({
        message: 'Should return invoiceId, vendorId, invoiceNumber, invoiceTotal, paymentTotal, creditTotal y bankId.' + messageDetails
    })
})

module.exports = router;