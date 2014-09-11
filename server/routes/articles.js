var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 5,
    host     : 'knightcapllc.com',
    user     : 'kyle',
    password : 'Tolkien!22',
    database: 'financial_intel',
    port: 3306
});

router.get('/', function(req, res){
    res.render('articles')
});

//Create an article
router.post('/', function(req, res){
    var article = req.body.newArticle;
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var sql = 'insert into news_articles values (?,?,?,?,?,?,?,?)';
        var params = [0,article.publication, article.articleDate, article.articleTitle, article.articleText, article.tags, article.ticker,
                      article.thoughtsResponse];
        connection.query(sql, params, function(err){
            if (err) throw err;
            connection.release();
            res.send(true)
        })
    })
});

//Get article by id
//TODO preload data in template for Angular (from news article)
router.get('/id/:id', function(req, res){
    res.render('viewarticle')
});

//Retrieve an article by id
router.post('/id/:id', function(req, res){
    var id = req.body.id;
    pool.getConnection(function(err, connection, cb){
        if(err) throw err;
        var sql = 'select * from news_articles where article_id =' + connection.escape(id);
        connection.query(sql, function(err, rows, fields){
            if (err) throw err;
            connection.release();
            res.json(rows)
        })
    })
})

//Update an article by id
router.put('/id/:id', function(req, res){
    var id = req.params.id;
    var article = req.body.article;
    pool.getConnection(function(err, connection, cb){
        if(err) throw err;
        var sql = 'update news_articles set article_tags = ?, ticker=?, thoughts_response=? where article_id =' + connection.escape(parseInt(id));
        var params = [article.article_tags, article.ticker, article.thoughts_response];
        connection.query(sql, params, function(err, rows, fields){
            if (err) throw err;
            connection.release();
            res.send(true)
        })
    })
});

//Retrieve an article by ticker
router.post('/ticker/:ticker', function(req, res){
    var ticker = req.params.ticker;
    pool.getConnection(function(err, connection, cb){
        if(err) throw err;
        var sql = 'select * from news_articles where ticker =' + connection.escape(ticker) + 'order by publication_date desc';
        connection.query(sql, function(err, rows, fields){
            if (err) throw err;
            connection.release();
            if (rows==''){
                res.status(500).end()
            }else{
                res.json(rows)
            }
        })
    })
});


module.exports = router;
