const express = require('express');
const bodyParser = require('body-parser');

const { checkLogin } = require('./middlewares/checkLogin')
const usersControllers = require('./controllers/usersControllers')

const app = express();
app.use(bodyParser.json());

app.post('/', checkLogin, usersControllers.login)


const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));