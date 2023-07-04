const { compare, hash } = require("../helpers/bcryptjs");
const { createToken, createRefreshToken, verifyRefreshToken } = require("../helpers/jwt");
const { User, Favorite } = require("../models/index")


class Controller {
    static async login(req, res) {
        try {

            console.log(req.body)

            let { email, password } = req.body;

            if (!email || !password) {
                throw {
                    name: "EmailorPasswordRequired",
                };
            }

            const user = await User.findOne({
                where: { email }
            })

            if (!user) {
                throw {
                    name: "InvalidCredential",
                };
            }

            const comparing = compare(password, user.password)

            if (!comparing) {
                throw {
                    name: "InvalidCredential",
                };
            }

            let payload = {
                id: user.id
            }

            const access_token = createToken(payload);
            const refresh_token = createRefreshToken({ id: user.id });


            res.status(200).json({ access_token, refresh_token, name: user.name, id: user.id });
        } catch (err) {
            res.status(404).json({
                message: "Invalid Email or Password"
            })
        }
    }

    static async reqToken(req, res) {
        try {
            const { refresh_token } = req.body;

            if (!refresh_token || !verifyRefreshToken(refresh_token)) {
                throw {
                    name: "InvalidRefreshToken",
                };
            }

            const payload = verifyRefreshToken(refresh_token);


            if (!payload) {
                throw {
                    name: "InvalidRefreshToken",
                };
            }

            const { id } = payload;

            const access_token = createToken({ id });

            res.status(200).json({ access_token });
        } catch (err) {
            res.status(401).json({
                message: "Session Expired"
            })

        }
    }
}

module.exports = Controller