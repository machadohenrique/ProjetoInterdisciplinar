//API Games 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/data");


const admsControllers = require('./controllers/adms.controller');
const userControllers = require('./controllers/user.controller');

connection
    .authenticate()
    .then(() => {
        console.log("Successful Connection");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: "sdhaçhidghaishçiassdasdfçf", cookie: { maxAge: 70000 }
}))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({});
    }
    next();
})

app.post("/loginAdmin", admsControllers.postLoginAdm);
app.get("/administrador", admsControllers.getGames);
app.post("/cadastroGame", admsControllers.postCadastroGames);
app.put("/atualizaGame/:id", admsControllers.atualizaGames);
app.delete("/deletarGame/:id", admsControllers.deleteGames);
app.post("/cadastroAdmin", admsControllers.postCreateAdm);



app.get("/game", userControllers.getGames);
app.post("/loginUser", userControllers.postLoginUser);
app.post("/cadastroUser", userControllers.postCreateUser);

app.listen(3000, () => {
    console.log("API RODANDO!")
})
