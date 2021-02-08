const express = require('express');
require('dotenv').config();
const app = express();
const { router } = require('./routes/routes');

app.use(express.json());
app.use('/api/v1/auth', router);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});