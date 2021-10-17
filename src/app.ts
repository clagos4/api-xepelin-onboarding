import express from 'express'
import routes from './routes';

const app = express()

app.use(express.json())

app.use('/', routes);

app.use((req, res, next) => {
    res.status(404);
    return res.json({message: `Endpoint not found for path: ${req.path}`});
  });

// #6
app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)