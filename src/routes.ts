import express from 'express';
import apiRoutes from './routes/api';


const router = express.Router();

router.use('/api', apiRoutes);

export = router;