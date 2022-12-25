import express from 'express';
import cors from 'cors';
import path from "path";
import routes from './src/routes';
import db from './src/db';

const app = express();
const port = process.env.PORT || 4001;

// init middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log(res)
  res.send('Hello, World!').status(200);
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);

//connect db
db.connect();
app.use('/', routes);
