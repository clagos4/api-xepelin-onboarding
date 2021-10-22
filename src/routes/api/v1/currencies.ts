import express from 'express';
import { PrismaClient } from '@prisma/client';
import {v4 as uuidv4} from 'uuid';


const router = express.Router();
const prisma = new PrismaClient();


router.get('/', async (req, res) => {
    const currencies = await prisma.currency.findMany();
    res.status(200).send({message: JSON.stringify(currencies)});
})

router.post('/create', async (req, res) => {
    const currency = await prisma.currency.create({
        data: {
            name: req.body.name
        },
    });
    res.status(201).send({message: 'Currency registred successfully!'});
})

export = router;
