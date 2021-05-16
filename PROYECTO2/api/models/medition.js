const { Schema, model } = require('mongoose');


const meditionSchema = new Schema({
    id_user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },tests: [{
        test:{//numero de test
            type: Number,
            required: true
        },
        valores: [
            {
                oxygen: {
                    type: Number,
                    required: true
                },
                rhythm:{
                    type: Number,
                    required: true
                },
                temperature:{
                    type: Number,
                    required: true
                }, fecha:{ // para saber cual fue la ultima medicion tomada
                    type: Date,
                    default : Date.now
                },
            }
        ]
    }]
},
    { timestamps: true }
);
module.exports = model('meditions', meditionSchema);