const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            });
        console.log("DB connected!");
    } catch (e) {
        console.log(e);
        throw new Error("DB connection failed.");
    }
}


module.exports = {
    dbConnection,
}
