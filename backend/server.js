import express from 'express';
import cors from 'cors';
import path from "path";
import routes from './src/routes';
import db from './src/db';

const app = express();
const port = process.env.PORT || 4001;
const __dirname = path.resolve();


// init middleware
app.use(cors());
app.use(express.json())
app.use('/api', routes);
app.use(express.static(path.join(__dirname, "../frontend", "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
});


//connect db
db.connect();

app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);