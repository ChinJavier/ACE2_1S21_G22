/*
    Generador de tokens:
    Retorna una promes que en su interior firma el token,
    la firma de token toma cuatro parametros:
    payload (datos), la llave, configuración y un callback que devuelve el token o un error.
*/

const jwt = require('jsonwebtoken');

const createJWT = (uid, user) => {
    return new Promise((resolve, reject) => { //
        const payload = { uid, user };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(`Couldn't generate token.`);
            }
            resolve(token);
        });
    });
}

module.exports = {
    createJWT
}