const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

const config = require('./config.js');



app.use(function(req, res, next) {
    const auth = {login: config.user, password: config.pwd} // change this

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


app.get('/prices',(req,res) => {
    //Ausliefern der Preise
    res.send('No Prices available');
});


app.listen(config.port,() => {
    console.log(`Server started on port ${config.port}`);
}

)