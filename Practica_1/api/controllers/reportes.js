const Velocity = require('../models/velocity');
const model_rhythm = require('../models/rhythm');
const Rendition = require('../models/rendition');
const Distance = require('../models/distance');
const Repetition = require('../models/repetition');

// TODO:    REPORTES

const pruebas = async (req, res) =>{
/*
    try {
        repeticiones = await Rendition.aggregate(
            [
              {
                $project: {
                    fecha : { $dateToString: { format: "%Y-%m-%d-%H-%M-%S", date: "$createdAt" } },
                    username  : "$username",
                    rendition : "$rendition"
                }
              }
            ]
         );
            console.log(repeticiones[0]);
        for (let i = 0 ; i < repeticiones.length; i++){
            try{
                const  {fecha , username , rendition} = repeticiones[i];
                const rep = new Rendition({fecha: fecha , username: username , rendition : rendition});
                rep.save();
            }catch(error){
                console.log(error);
            }
        }

    } catch (error) {
        console.log(error);
    }

*/
 
   /* console.log(hola);
   for(let i = 0; i < hola.length; i++){
        const {_id} = hola[i];
        await Rendition.findByIdAndDelete({_id: _id});
    }*/


}




module.exports = {
    pruebas
}
