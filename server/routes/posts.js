const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const Comment = require('../models/Comment');

router.get('/feed', (req, res) => {
    Post.find()
        .populate('user', {email:1, _id: 0})
        .then(post => {

            Comment.find()
                .populate('post')
                .populate('author')
                .then(comment => {
                    res.status(200).json({post, comment})
                })
                .catch(err => console.log(err));

            
        })
        .catch(err => console.log(err))
        
});

router.get('/:id', (req, res) => {
    Post.find({user:req.params.id})
        .populate('user', {email:1, _id: 0})
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => console.log(err))
        
});

router.post('/:id/posts', (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    const newPost = new Post({title, content, user: id});
    newPost.save()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => res.status(400).json(err));
});

router.get('/:id/posts/:postId', (req, res) => {
    const {id, postId} = req.params;

    Post.findById(postId)
        .populate('user', {email: 1, _id: 0})
        .then(post => {
            res.json(post)
        })
        .catch(err => console.log(err));
});

router.post('/:id/posts/:postId', (req, res) => {
    const {postId} = req.params;
    const {comment} = req.body;
    const userId = req.session.currentUser._id;
    
    const newComment = new Comment({comment, post: postId, author: userId})
    newComment.save()
        .then(comentario => {
            res.json(comentario)
        })
        .catch(err => console.log(err));
});




module.exports = router;