const cors = require('cors');
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
const { router } = require('./routes/routes');
const {routerTest} = require('./routes/routesMux.js')
const app = express();

// DB Connection
dbConnection();

// settings
app.set('port', process.env.PORT || 3000);

// middlawares
app.use(cors());
app.use(express.json());


app.use('/api/v1/auth', router);
app.use('/',routerTest);

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});

// CORRER EL SERVER CON: npm run dev
 // PROBAR RUTA: http://localhost:3000/sensores/