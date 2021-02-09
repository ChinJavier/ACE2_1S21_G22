// aca necesito el servicio de la nube

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/arquiDB',// PARA atlas solo cambia esta linea
{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(db =>  console.log('DATABASE IS CONNECTED'))
.catch(err => console.error(err));
