const express = require('express');
const router = express.Router();

const invoicesRoutes = require('./invoices');
const usersRoutes = require('./users');

router.use('/invoices', invoicesRoutes);
router.use('/users', usersRoutes);

module.exports = router;