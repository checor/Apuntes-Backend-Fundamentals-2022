const User = require('../models/users');

async function signUp(req, res) {
    const body = req.body;
    try { 
        const user = await User.create(body)
        res.status(201).json(user);
    } catch (err) {
        if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name) ) {
            return res.status(400).json({
                error: err.errors.map(e => e.message)
            })
        }
        else {
            throw err;
        }
    }
}

module.exports = { signUp }