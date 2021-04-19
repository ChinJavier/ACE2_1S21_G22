const jwt = require('jsonwebtoken');


const validateJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.code(401).json({
            ok: false,
            msg: "There's no token...",
        });
    }
    try {
        const { uid, username } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.username = username;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token is not valid",
        });
    }
    next();
}

module.exports = {
    validateJWT
}