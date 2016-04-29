var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Article = function(options) {
  this.id = options.id;
  this.title = options.title;
  this.content = options.content;
  this.createdAt = options.createdAt;
};

Article.getAll = function(cb) {
  db.select()
    .from('article')
    .map(function(row) {
      return new Article(row);
    })
    .then(function(articleList) {
      cb(null, articleList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

Article.get = function(articleId, cb) {
  db.select()
    .from('article')
    .where({
      id : articleId
    })
    .map(function(row) {
      return new Article(row);
    })
    .then(function(articleList) {
      if(articleList.length) {
        cb(null, articleList[0]);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}

//instance fnuction
Article.prototype.save = function (cb) {
  if(this.id) {
    db('article')
      .update({
        title : this.title,
        content : this.content
      })
      .where({
        id : this.id
      })
      .then(function() {
        cb(null);
      })
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      })
  } else {
    db('article')
      .insert({
        title : this.title,
        content : this.content
      })
      .then(function(result) {
        this.id = result[0];
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      });
  }
};


module.exports = Article;
