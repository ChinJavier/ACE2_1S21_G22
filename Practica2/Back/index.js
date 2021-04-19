const cors = require('cors');
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
const path = require('path');

const app = express();
const morgan = require('morgan');
// DB Connection
dbConnection();

app.set('port', process.env.PORT || 3000);

// middlawares
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

// POR EL MOMENTO SOLO RUTAS DE USUARIO
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/logic',require('./routes/logic.routes'));


// Manejador de rutas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});

// CORRER EL SERVER CON: npm run dev
 // PROBAR RUTA en POST: http://localhost:3000/sensores/
