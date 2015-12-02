var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var jwt = require('express-jwt');
//middleware for authenticating jwt tokens
var auth = jwt({secret: process.env.JWT_SECRET, userProperty: 'payload'});

router.get('/posts', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) {
            return next(err);
        }

        res.json(posts);
    });
});

router.post('/posts', auth, function (req, res, next) {
    var post = new Post(req.body);
    post.author = req.payload.username;

    post.save(function (err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

router.param('post', function (req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, post) {
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(new Error('Can\'t find post'));
        }

        req.post = post;
        return next();
    });
});

router.get('/posts/:post', function (req, res, next) {
    req.post.populate('comments', function (err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

router.put('/posts/:post/upvote', auth, function (req, res, next) {
    req.post.upvote(function (err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

router.post('/posts/:post/comments', auth, function (req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = req.payload.username;

    comment.save(function (err, comment) {
        if (err) {
            return next(err);
        }

        req.post.comments.push(comment);
        req.post.save(function (err, post) {
            if (err) {
                return next(err);
            }

            res.json(comment);
        });
    });
});

router.param('comment', function (req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment) {
        if (err) {
            return next(err);
        }
        if (!comment) {
            return next(new Error('Can\'t find comment'));
        }

        req.comment = comment;
        return next();
    });
});

router.get('/posts/:post/comments/:comment', function (req, res, next) {
    res.json(req.comment);
});

router.put('/posts/:post/comments/:comment/upvote', auth, function (req, res, next) {
    req.comment.upvote(function (err, comment) {
        if (err) {
            return next(err);
        }

        res.json(comment);
    });
});

module.exports = router;
