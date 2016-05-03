var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {
    member : null
  });
});

//members test
router.get('/members/:memberId', function(req, res) {
  Member.get(req.params.memberId, function(err, member) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      res.json(member);
    }
  })

});

router.post('/', function(req, res, next) {

  //首先必須先產生出一個Member的物件在進行save
  var newMember = new Member({
    name : req.body.name,
    account : req.body.account,
    password : req.body.password
  });
  newMember.save(function(err) {
    if(err) {
      next(err);
    } else {
      //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
      req.session.member = newMember;
      res.redirect('/');
    }
  });
});

router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});

router.put('/members/:memberId', function(req, res) {
  //必須先取得該member在進行update
  Member.get(req.params.memberId, function(err, member) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      //取得member, 進行update及save
      member.name = req.body.name || member.name; //這樣的寫法表示當req.body.name不存在時以member.name當作值
      member.account = req.body.account || member.account;
      member.password = req.body.password || member.password;
      member.save(function(err) {
        if(err) {
          res.status(err.code);
          res.json(err);
        } else {
          res.json(member);
        }
      });
    }
  });

});

//article test
/* GET home page. */
router.get('/', function(req, res, next) {
  Article.getAll(function(err, articleList) {
    if(err) {
      next();
    } else {
      res.render('index', { articleList: articleList });
    }
  });
});

router.get('/articles', function(req, res) {
  Article.getAll(function(err, articleList) {
    if(err) {
      res.json(err);
    } else {
      res.json(articleList);
    }
  });
});

router.get('/articles/:articleId', function(req, res) {
  Article.get( req.params.articleId, function(err, article) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      res.json(article);
    }
  });
});

router.put('/articles/:articleId', function(req, res) {
  Article.get( req.params.articleId, function(err, article) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      article.title = req.body.title || article.title;
      article.content = req.body.content || article.content;
      article.save(function(err) {
        if(err) {
          res.status = err.code;
          res.json(err);
        } else {
          res.json(article);
        }
      });
    }
  });
});

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
//
//

module.exports = router;
