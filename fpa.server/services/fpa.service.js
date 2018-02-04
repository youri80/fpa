var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = {
    userName: '',
    password: '',
    server: ''
}



module.exports = {
    loadPrice: () => {
        return new Promise((resolve, reject) => {
            var connection = new Connection(config);
            var query = "select * from fpa.prices";
            request = new Request(, function (err, rowCount, rows) {
                if (err) {
                    reject(err);
                }
                resolve({
                    rowCount: rowCount,
                    rows: rows
                });
            });
            connection.execSql(request);
        });
    }
}