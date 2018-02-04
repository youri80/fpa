var Connection = require('tedious').Connection;
var fs = require('fs')
var config = {
    userName: '',
    password: '',
    server: ''
}

var Request = require('tedious').Request;

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