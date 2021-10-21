import express from 'express';
import { PrismaClient } from '@prisma/client';
import {v4 as uuidv4} from 'uuid';


const router = express.Router();
const prisma = new PrismaClient();


router.get('/', async (req, res) => {
    const users = await prisma.client.findMany();
    res.status(200).send({message: JSON.stringify(users)});
})

router.post('/register', async (req, res) => {
    const uuid = uuidv4();
    if (req.body.currency in ['CLP', 'USD', 'EUR']) {
        res.status(400).send({message: 'Currency must be CLP, USD or EUR.'})
    }
    const user = await prisma.client.create({
        data: {
            name: req.body.name,
            internal_code: parseInt(req.body.internal_code),
            tax_id: parseInt(req.body.tax_id),
            currency: req.body.currency,
            max_api_calls: parseInt(req.body.max_api_calls),
            id: uuid
        },
    });
    var banks = req.body.banks;
    banks.forEach(async (bankId: Number) => {
        var bank = await prisma.bank.findFirst({where: {bank_id: Number(bankId)}})
        if (!bank) {
            bank = await prisma.bank.create({data: {bank_id: Number(bankId)}});
            if (!bank) {return res.status(500).send({message: 'Error in create Bank method.'})}
        }
        var bankClient = await prisma.bankClient.findFirst({where: {client_id: user.id, bank_id: Number(bank.id)}});
        if (!bankClient) {
            bankClient = await prisma.bankClient.create({data: {client_id: user.id, bank_id: Number(bank.id)}})
            if (!bankClient) {return res.status(500).send({message: 'Error in create Bank-Client relation method.'});}
        }
    });
    res.status(201).send({message: 'Client registred successfully!'});
})


router.patch('/:id', async (req, res, next) => {
    var id = req.params.id;
    var data: { [name: string]: Number | String } = {};
    //var editables = ['tax_id', 'currency'];
    if (req.body.tax_id !== null) {data["tax_id"] = req.body.tax_id}
    if (req.body.currency !== null) {data["currency"] = req.body.currency}
    console.log(data)
    var client = await prisma.client.update({where: {id: String(id)}, data: data})
    if (!client) {return res.status(500).send({message: 'Error in update client method.'});}
    res.status(204).send({message: 'Client updated succesfully!'})
})

router.delete(`/:id`, async (req, res) => {
    const { id } = req.params
    const bankRelationIds = await prisma.bankClient.findMany({
        where: { client_id: String(id) },
    })
    bankRelationIds.forEach( async info => {
        const id = info.id;
        const bankRelations = await prisma.bankClient.delete({
            where: { id: Number(id) },
        })
        console.log(bankRelations)
    });
    const status = await prisma.client.delete({
        where: { id: String(id) },
    })
    console.log(status)
    res.status(204).send({message: 'Client deleted succesfully!'})
})

export = router;