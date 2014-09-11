var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mongoose = require('mongoose');
var Strategy = require('../models/strategy');

var pool = mysql.createPool({
    connectionLimit : 5,
    host     : 'knightcapllc.com',
    user     : 'kyle',
    password : 'Tolkien!22',
    database : 'financial_intel',
    port     : 3306
});


router.get('/', function(req, res){
    res.render('finintel')
});

router.post('/', function(req, res){
    var ticker = req.body.ticker;
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var sql = 'select * from finviz_overview aa\
            inner join finviz_financial bb \
            on bb.ticker = aa.ticker\
            inner join finviz_valuation cc\
            on cc.ticker = bb.ticker\
            where aa.ticker =' + connection.escape(ticker);
        connection.query(sql, function(err, rows, fields){
            if (err) throw err;
            connection.release();
            if (rows==''){
                res.send(500);
            }else{
                res.json(rows);
            }
        })
    })
});


module.exports = router;
