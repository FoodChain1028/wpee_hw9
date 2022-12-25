import express from 'express';
import cors from 'cors';
import routes from './src/routes';
import db from './src/db';

const app = express();
const port = process.env.PORT || 4001;

// init middleware
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  console.log(res)
  res.send('Hello, World!').status(200);
});

app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);

//connect db
db.connect();

app.use('/api', routes);
