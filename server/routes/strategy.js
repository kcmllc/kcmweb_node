var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
    res.render('strategy')
})


router.post('/', function(req, res){
    req.db.model('strategy').find(function(err, strategies){
        if (err)
            res.send(err)
        res.json(strategies)
    })
})
router.put('/:ticker', function(req, res){
    var data = req.body
    delete data._id
    req.db.model('strategy').update({'ticker':data.ticker}, {$set: data}, function(err, strategy){
        if (err)
            res.send(false)
        else
            res.send(true)
    })
})

router.post('/:ticker', function(req, res){
    var data = req.body
    req.db.model('strategy').collection.insert(data, function(err, strategy){
        if (err)
            res.send(false)
        console.log(strategy)
        res.send(true)
    })
})

module.exports = router
