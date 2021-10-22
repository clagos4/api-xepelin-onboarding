import currenciesRoutes from './currencies';
import express from 'express';
import usersRoutes from './users';
import invoicesRoutes from './invoices';


const router = express.Router();

router.use('/currencies', currenciesRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/users', usersRoutes);

export = router;