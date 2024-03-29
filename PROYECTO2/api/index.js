const cors = require('cors');
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
const { router } = require('./routes/routes');
const {routerMux} = require('./routes/routesMux.js');
const {routerQueries} = require('./routes/queries');
const path = require('path');
const morgan = require('morgan');
const app = express();

// DB Connection
dbConnection();

// settings
app.set('port', process.env.PORT || 3000);

// middlawares
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/auth', router);
app.use('/',routerMux);
app.use('/logic' , routerQueries);


// Manejador de rutas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});
// server
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});

// CORRER EL SERVER CON: npm run dev
 // PROBAR RUTA en POST: http://localhost:3000/sensores/