var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        member: null,
        status: null
    });
});

//members test
router.get('/members/:memberId', function(req, res) {
    Member.get(req.params.memberId, function(err, member) {
        if (err) {
            res.status(err.code);
            res.json(err);
        } else {
            res.json(member);
        }
    });

});

router.post('/', function(req, res, next) {
    var account = req.body.account;
    var password = req.body.password;

    Member.getByAccount(account, function(err, member) {
        if (err || password !== member.password) {
            res.render('login', {
              member: null,
              status: 'Either your account or password is not correct'
            });
            // res.redirect('/');
        } else {
            req.session.member = member;
            res.redirect('/');
        }
    });
});

router.post('/logout', function(req, res, next) {
    req.session.member = null;
    res.redirect('/');
});


module.exports = router;
