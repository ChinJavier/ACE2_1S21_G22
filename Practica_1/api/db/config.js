// aca necesito el servicio de la nube

const mongoose = require('mongoose');
const url = 'mongodb://localhost/arquiDB';
mongoose.connect(url,// PARA atlas solo cambia esta linea
{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(db =>  console.log('DATABASE IS CONNECTED'))
.catch(err => console.error(err));

mongoose.connection.on('open' , _ => { console.log('database is open in ' , url);});