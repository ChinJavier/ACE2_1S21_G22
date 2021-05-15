/*
    Controladores de la Autenticación:
    Lleva a cabo toda la lógica de cada endpoin,
    la creación de usuarios, login, verificación de token
    y encriptación de contraseña.
*/

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/jwt');

const createUser = async (req, res = express.response) => {
    const { username, password } = req.body;
    try {

        let user = await User.findOne({ username: username });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "User is already registered!",
            });
        }

        user = new User(req.body);

        // Encrypting password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();


        // Gen JWT
        const token = await createJWT(user.id, user.username);


        res.status(201).json({
            ok: true,
            uid: user.id,
            username: user.username,
            name: user.name,
            gender: user.gender,
            age: user.age,
            height: user.height,
            weight: user.weight,
            isCoach: user.isCoach,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Please, contact the administrator...",
        });
    }


};

const logUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User does not exists.",
            });
        }

        // Validating password

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrect",
            });
        }

        // Gen. JWT
        const token = await createJWT(user.id, user.name);


        res.status(200).json({
            ok: true,
            uid: user.id,
            username: user.username,
            isCoach: user.isCoach,// solo para redirigir a otro lado en el front
            token,
        });

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: "Please, contact the administrator...",
        });
    }


}

const revalidateToken = async () => {
    const { uid, username } = req;
    const token = await createJWT(uid, username);
    res.json({
        uid,
        username,
        token,
    });
}


module.exports = {
    createUser,
    logUser,
    revalidateToken
}