const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../database/cadastro");


exports.postLoginUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ where: { email: email } }).then(user => {

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                user.password = undefined;
                if (result) {
                    let token = jwt.sign({ name: user.name }, "verySecretValue", { expiresIn: '1h' })
                    res.json({
                        message: 'Login Successful',
                        user,
                        token
                    })
                } else {
                    res.json({
                        menssage: 'Password does not matched!'
                    })
                }
            })
        } else {
            res.json({
                message: 'No user found!'
            })
        }

    })
}

exports.getGames = (req, res) => {
    Jogos.findAll({
        raw: true, order: [
            ['title', 'ASC']
        ]
    })
        .then(jogos => res.json({
            error: false,
            data: jogos
        }))
}


exports.postCreateUser = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.sendStatus(200);
            }).catch((err) => {
                console.log(err)
            })
        } else {
            res.sendStatus(404)
        }
    })
}

/*
app.delete("/userDelete/:id", (req, res) => {
    const userId = req.params.id;
    User.destroy({
        where: {
            id: userId
        }
    })
        .then(status => res.status(201).json({
            error: false,
            menssage: 'New User has been  delete'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }))
})
*/