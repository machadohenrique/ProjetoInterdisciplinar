const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Jogos = require("../database/catalago");
const Admin = require("../database/admin");

exports.postLoginAdm = (req, res) => {
    const { emailAdmin, passwordAdmin } = req.body;

    Admin.findOne({ where: { emailAdmin: emailAdmin } }).then(admin => {

        if (admin) {
            bcrypt.compare(passwordAdmin, admin.password, function (result) {
                try {
                    admin.passwordAdmin = undefined;
                    if (result) {
                        let token = jwt.sign({ nameAdmin: admin.nameAdmin }, "verySecretValue", { expiresIn: '1h' })
                        res.json({
                            message: 'Login Successful',
                            admin,
                            token
                        })
                    } else {
                        res.json({
                            menssage: 'Password does not matched!'
                        })
                    }
                } catch (err) {
                    res.json({
                        error: err
                    })
                }
            })
        } else {
            res.json({
                message: 'No user found!'
            })
        }
    })
};

exports.postCreateAdm = (req, res) => {
    const { nameAdmin, emailAdmin, passwordAdmin } = req.body;

    Admin.findOne({ where: { emailAdmin: emailAdmin } }).then(admin => {
        if (admin == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(passwordAdmin, salt);

            Admin.create({
                nameAdmin: nameAdmin,
                emailAdmin: emailAdmin,
                passwordAdmin: hash
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

exports.postCadastroGames = (req, res) => {
    const { title, price, LaunchYear } = req.body;

    Jogos.create({
        title: title,
        price: price,
        LaunchYear: LaunchYear
    }).then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(404);
    })
}

exports.atualizaGames = (req, res) => {
    const gameId = req.params.id;
    const { title, price, LaunchYear } = req.body;

    Jogos.update({
        title: title,
        price: price,
        LaunchYear: LaunchYear
    }, {
        where: {
            id: gameId
        }
    })
        .then(game => res.status(201).json({
            error: false,
            menssage: 'Games has been updated'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }))
}


exports.deleteGames = (req, res) => {
    const gameId = req.params.id;
    Jogos.destroy({
        where: {
            id: gameId
        }
    })
        .then(status => res.status(201).json({
            error: false,
            menssage: 'New Game has been  delete'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }))
}