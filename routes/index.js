var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:memberId', function(req, res) {
  Member.get(req.params.memberId, function(err, member) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      res.json(member);
    }
  })

});

//所以我們這樣就完成了一個model的function
//
//在這邊再測試一次是否可以進行新增或是修改

router.post('/members', function(req, res) {
  //首先必須先產生出一個Member的物件在進行save
  var newMember = new Member({
    name : req.body.name,
    account : req.body.account,
    password : req.body.password
  });
  newMember.save(function(err) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      res.json(newMember);
    }
  });
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
module.exports = router;
