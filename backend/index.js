const express = require('express')
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const accountRouter = require('./routes/accountRouter');

const app =express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/account',accountRouter);

app.listen(3000);
