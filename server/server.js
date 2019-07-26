// CONFIG
const express = require('express');
const mongoose = require('mongoose');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require('cors');

const app = express();


// CONNECTION
// mongoose.connect('mongodb://jp:Ironhack1@ds255107.mlab.com:55107/irongram', { useNewUrlParser: true })
mongoose.connect('mongodb://localhost:27017/irongram', { useNewUrlParser: true })
    .then(db => console.log('La base de datos de virus ha sido actualizada'))
    .catch(err => Console.log(err))


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 14
    })
}));


// ROUTES
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/posts'))



// LISTEN
app.listen(3000, () => console.log('El servidor está listo'))







