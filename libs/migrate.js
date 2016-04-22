var db = require('./db');
var bcrypt = require('bcryptjs');
var async = require('async');

var salt = "blog-password-salt-edu-nccu-soslab";

var memberList = [{
  name : "William1",
  password : "password1",
  account : "account1"
},
{
  name : "William2",
  password : "password2",
  account : "account2"
},
{
  name : "William3",
  password : "password3",
  account : "account3"
}];

db.query("DROP DATABASE blog", function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("CLEAR");
  }
});

// insertMember(memberList,function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("MEMBER INSERT DONE");
//   }
// });


function insertMember(memberList, cb) {
  async.each(memberList, function(member, callback) {
    db.query("INSERT INTO member (name, account, password) VALUES (?, ?, ?)",[
      member.name,
      member.account,
      bcrypt.hashSync(salt+member.password, 10)
    ], function(err, result) {
      if(err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }, function(err) {
    if(err) {
      cb(err);
    } else {
      cb(null);
    }
  })
};
