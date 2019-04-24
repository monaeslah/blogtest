var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const auth = require('../tools/auth.js');
const ac = require('../tools/roles.js');
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comments');
const path = require('path');
const mongoose = require('mongoose');


var db = mongoose.connect('mongodb://localhost/maktabblog',{ useNewUrlParser: true }, function (err, res) {
  if (err) { console.log('Failed to connect to ' + db); }
  else { console.log('Connected to ' + db); }
});

router.get('/panel*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../panel/build/') });
});


router.get('/', (req, res) => {

  Article.find({}, function (err, contents) {
    if (err)
        res.send(err)
    res.render('index', {
        contents
    })
  });
});


router.post('/signin', passport.authenticate('local-login'), (req, res) => {

  User.find({username: req.body.username}, (err, user)=>{
    if (err)
      console.log(err)
    res.json({
      role: user[0].role,
      success: true,
      msg: "ُSignIn"
    })
  })
});


router.post('/signup', (req, res) => {

  if (!req.body.username || !req.body.password) {
    return res.json({
      success: false,
      msg: "you must signup first"
    })
  }


  let user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    sex: req.body.sex,
    phone: req.body.phone,
    role: "user"
  })

  user.save((err, user) => {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error in sign up user\n" + err.message
      })
    }
    res.json({
      success: true,
      user
    })
  })
});



router.get('/myprofile', (req, res) => {

  User.find({username: req.user.username}, function (err, contents) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error profile\n" + err.message
      })
    }
    res.json(contents)
  });
});


router.post('/editProfile', (req, res) => {
  User.update({_id: req.user._id},
    {$set: { 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      sex: req.body.sex,
      phone: req.body.phone
     }},
     function (err, content){
      if (err) {
        return res.json({
          success: false,
          msg: " error comments\n" + err.message
        })
      }
      res.json({
        success: true,
        content
      })
    })
});



router.post('/allmembers', (req, res) => {  
  User.find({}, function (err, content) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error members\n" + err.message
      })
    }
    res.json({
        success: true,  
        content
    })
  });
});




router.post('/resetPassword', (req, res) => {
  console.log(req.body.id)
  User.update({_id: req.body.id},
    {$set: { 
      password: req.user.phone
     }},
     function (err, content){
      if (err) {
        console.log(err.message)
        return res.json({
          success: false,
          msg: "error in reset password\n" + err.message
        })
      }
      res.json({
        success: true,
        content
      })
    })
});

router.post('/deleteUser', (req, res) => {  
  User.deleteOne({_id: req.body.id}, function (err, content) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error in delete member\n" + err.message
      })
    }
    res.json({
          success: true,  
          content
      })
    
      console.log(content)
  });
});

router.post('/allArticle', (req, res) => {
  Article.find({}, function (err, content) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error articles\n" + err.message
      })
    }
    res.json({
      success: true,
      content,
      role: req.user.role
    })
  });
});




router.post('/myArticle', (req, res) => {
  Article.find({username: req.user.username}, function (err, content) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error articles\n" + err.message
      })
    }
    console.log(req.user._id)
    console.log(req.user.username)
    res.json({
      success: true,
      content
    })
  });
});



router.post('/addarticle', (req, res) => {  
  let article = new Article({
    title: req.body.title,
    text: req.body.text,
    createDate: new Date(),
    author: req.user.firstname + " " + req.user.lastname,
    username: req.user.username
  })

  article.save((err, article) => {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error add article\n" + err.message
      })
    }
    res.json({
      success: true,
      article,
      role: req.user.role
    })
  })
});


router.post('/editArticle', (req, res) => {

  Article.update({_id: req.body.id},
    {$set: { 
      title: req.body.title,
      text: req.body.text
     }},
     function (err, content){
      if (err) {
        console.log(err.message)
        return res.json({
          success: false,
          msg: "error in edit article\n" + err.message
        })
      }
      res.json({
        success: true,
        content
      })
    })
});

router.post('/deleteArticle', (req, res) => {
 
  Article.deleteOne({_id: req.body.id}, function (err, content) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error delete article\n" + err.message
      })
    }
    res.json({
          success: true,  
          content
      })
  });
});




router.post('/allComments', (req, res) => {
  
  Comment.find({}, function (err, content) {
    if (err) {
      return res.json({
        success: false,
        msg: "error display comments\n" + err.message
      })
    }
    res.json({
        success: true,  
        content
    })
  });
});


router.post('/showComments', (req, res) => {
    
  Comment.find({articleID: req.body.id}, function (err, comment) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error comments\n" + err.message
      })
    }
    res.json({
      success: true,
      comment
    })
  });
});


router.post('/addComment', (req, res) => {
    
  let comment = new Comment({
    text: req.body.text,
    createDate: new Date(),
    username: req.user.username,
    articleID: req.body.id
  })

  console.log(comment)

  comment.save((err, comment) => {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "error add comment\n" + err.message
      })
    }
    res.json({
      success: true,
      comment
    })
  })
});

router.post('/deleteComment', (req, res) => {

  Comment.deleteOne({_id: req.body.id}, function (err, content) {
    if (err) {
      return res.json({
        success: false,
        msg: "error in delete comment\n" + err.message
      })
    }
    res.json({
          success: true,  
          content
      })
  });
});






module.exports = router;
