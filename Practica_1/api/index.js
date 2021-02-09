const cors = require('cors');
const express = require('express');

require('dotenv').config();
require('./database');

const app = express();
const { router } = require('./routes/routes');

// settings
app.set('port',  process.env.PORT || 3000);

// middlawares
app.use(cors());// PARA LA COMUNICACION CON ANGULAR
app.use(express.json());


app.use('/api/v1/auth', router);
app.use('/api/v1/auth', (req,res) => {res.send( {text : `servidor en el puerto ${app.get('port')}` })});

app.listen(app.get('port') , () => {
    console.log(`Server running on port ${app.get('port')}`);
});
