var mongodb = require('./db.js');
//var monk = require('monk');
//var mongodb = monk('localhost:27017/blog');
function Post(name, title, tags, post) {
  this.name = name;
  this.title = title;
  this.tags = tags;
  this.post = post;
}

module.exports = Post;

Post.show = function(){
	 //打开数据库
	  mongodb.open(function (err, db) {
	    //读取 users 集合
	    db.collection('posts', function (err, collection) {
	      if (err) {
	        mongodb.close();
	       
	      }
	      //查找用户名（name键）值为 name 一个文档
	      collection.findOne({
	        name: 'wang'
	      }, function (err, post1) {
	       
	        if (err) {
	          mongodb.close();
	        }
	       console.log(post1);
	       mongodb.close();
	      });
	      });

	      });
  }
