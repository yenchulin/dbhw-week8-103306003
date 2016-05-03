var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');


//members test
router.get('/:articleId', function(req, res, next) {
  Article.get(req.params.articleId, function(err, article) {
    if(err) {
      console.log(err);
      next();
    } else {
      Member.get(article.memberId, function(err, member) {
        if(err) {
          console.log(err);
        } else {
          article.member = member;
          res.render('articleDetail', {
            article : article,
            member : req.session.member || null
          });
        }
      })

    }
  });
});


//TODO
router.post('/articles', function(req, res) {
  var newArticle = new Article({
    title : req.body.title,
    content : req.body.content
  });

  newArticle.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      res.json(newArticle);
    }
  });
});


module.exports = router;
