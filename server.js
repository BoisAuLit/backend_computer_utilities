require('module-alias/register');
require('dotenv').config();
const cors = require('cors');


const express = require('express');
const app = express();
app.use(cors());


const port = 3000;
const apiRouter = require('@app/routes/index');


app.use('/api', apiRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`)
})