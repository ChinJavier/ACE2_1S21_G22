const bandejaCtrl = {}
const model_bandeja = require('../models/bandeja');
const nodemailer = require('nodemailer')

bandejaCtrl.getMyMails = async(req,res) =>{
    console.log("El id del usuario de los mails es ", req.params.id)
    try {
        const mails =  await model_bandeja.find({user: req.params.id});
        res.send(mails);
    } catch (error) {
        console.log('error al recuperar todos los registros de oxigeno');
        res.send('ID INCORRECTO');
    }
}


bandejaCtrl.createMail = async (req,res)=>{
    const mail = new model_bandeja(req.body);
    try {
        await mail.save();
        console.log("NEW USER: ", mail);
        res.send('ok')
    } catch (error) {
        console.log(error);
        res.send('algo ocurrió mal')
    }

    
}

bandejaCtrl.sendMail = async(req,res)=>{
    const {email, encabezado, cuerpo} = req.body;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user:"BandTunGt@gmail.com",
            pass: "cuentaBandTun"
        }
    });

    let mailOptions = {
        from: "BandTunGt@gmail.com",
        to: email,
        subject: encabezado,
        html: `<h1>${cuerpo}</h1>
               <img src="https://cdn.discordapp.com/attachments/794467705033064453/844034978760884235/unknown.png" width="auto" height="100">`
    };

    await transporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            return res.status(500).send(error.message);
        }else{
            return res.send("Enviado Exitoso");
        }
    });

}





module.exports = bandejaCtrl;