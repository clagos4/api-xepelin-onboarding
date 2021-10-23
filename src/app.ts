import dotenv from 'dotenv';
import express from 'express'
import morgan from 'morgan';
import routes from './routes'; 
import { timers } from "./timers";

// Initiate api
const app = express()
app.use(express.json())

// Console log library
app.use(morgan('dev'));

// Initiate .env
dotenv.config();

// Set Timers
timers();

// Set routes
app.use('/', routes);


// Error handling
app.use((req, res) => {
    res.status(404);
    return res.json({message: `Endpoint not found for path: ${req.path}`});
  });

// listen server
app.listen(3200, () =>
  console.log('REST API server ready at: http://localhost:3200'),
)
