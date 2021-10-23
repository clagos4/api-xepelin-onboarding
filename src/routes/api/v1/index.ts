import currenciesRoutes from './currencies';
import express from 'express';
import clientsRoutes from './clients';
import invoicesRoutes from './invoices';


const router = express.Router();

router.use('/currencies', currenciesRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/clients', clientsRoutes);

export = router;