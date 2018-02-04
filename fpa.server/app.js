const express = require('express');
const fs = require('fs');
const auth = require('./services/auth.service');
const app = express();
var https = require('https');

const config = require('./config');

auth.setConfig(config);

var sslOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
  };

app.use(function (req, res, next) {
    const auth = { login: config.user, password: config.pwd } // change this
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (!login || !password || login !== auth.login || password !== auth.password) {
        res.set('WWW-Authenticate', 'Basic realm="fpa"') // change this
        res.status(401).send('You shall not pass.') // custom message
        return
    }
    next();
});

app.use((req,res,next)=> {
    console.log(`${new Date().toString()} - ${req.path}`);
    next();
});

app.get('/prices', (req, res) => {
    //Ausliefern der Preise
    res.send('no prices available');
});

app.get('/hash', (req, res) => {
    auth.hashValue(req.query.pwd).then((result) => {
        res.json({
            key:result.pwd,
            salt:'test'
        });
        //res.send(`key:${result.pwd} <br/> salt:${result.salt}`);
    });
});

https.createServer(sslOptions, app).listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});