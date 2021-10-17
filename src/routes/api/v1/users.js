const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
    res.status(201).send({message: 'Should create client!'});
})

router.patch('/:id', async (req, res, next) => {
    res.status(204).send({message: 'Should update client!'})
})

module.exports = router;