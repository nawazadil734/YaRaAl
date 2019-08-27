const passport = require('passport');
const mongoose = require('mongoose');
const Community = mongoose.model('community');
const User = mongoose.model('users');
const Post = mongoose.model('blogPost');


module.exports = (app) => {
        app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
            })
        );
        
        app.get(
            '/auth/google/callback', 
            passport.authenticate('google'),
            (req, res) => { 
                res.redirect('/');
            });
        
        
        app.get('/auth/facebook', passport.authenticate('facebook', {
            scope: ['user_birthday', 'email']
        }));
        
        app.get(
            '/auth/facebook/callback', 
            passport.authenticate('facebook'),
            (req, res) => { 
                res.redirect('/')
            });

            app.get('/auth/instagram',
            passport.authenticate('instagram', {
                scope: ['basic'] 
            }));

            app.get(
            '/auth/instagram/callback', 
            passport.authenticate('instagram'),
            (req, res) => { 
                res.redirect('/')
            });

        app.get('/api/logout', (req,res) => {
            req.logout();
                res.redirect('/'); 
        });
        app.get('/api/current_user', (req, res) => {
            res.send(req.user);
        });

        app.post('/api/signupUser', (req, res) => {
            Community.findOne({ title: req.body.title})
            .then(post => {
                if(post) {
                    post.update({ description: req.body.description})
                    .then((updated) => updated.save());
                }
            })
            res.send({hi : "there"});
        });

        app.get('/api/fetchCommunites', async (req, res) => {
            const communities = await Community.find();
            res.send(communities);
        })

        app.get('/api/fetchCommunity', async (req, res) => {
            var url = req.headers.referer;
            const title = url.match(/([^\/]*)\/*$/)[1];
            var final = title.replace("%20", " ");
            const data = await Community.findOne({ title: final});
            res.send(data);
        })

        app.post('/api/createPost', async (req, res) => {
            const post = new Post({ title: req.body.title, 
                        content: req.body.content, 
                        videoURL: req.body.url});
            const user = await User.findOne({ email: req.body.email});
            user.posts.push(post);
            user.save();
            const com = await Community.findOne({ title : req.body.community});
            com.blogPosts.push(post);
            com.save();
            post.user = user;
            post.community = com;
            post.save();
            res.redirect('/');
        })

        app.get('/api/posts', async (req, res) => {
            const allPosts = await Post.find().populate('community').populate('user');
            res.send(allPosts);
        })

        app.post('/api/editposts', async (req, res) => {
            const response = await Post.findById(req.body.id);
            await Post.updateOne({ _id: response._id}, { $set: { title: req.body.title, content: req.body.content,  videoURL: req.body.videoURL}});
            res.redirect("/");
            
        });

        app.delete("/api/deletePost", async (req, res) => {
            const id = req.body.foo;
            await Post.deleteOne({ _id: id});
            res.send({});
        });

        app.get('/api/fetchLikes', async (req, res) => {
            console.log(req.headers);
            res.send({});
        });

        app.get('/api/fetchPost', async (req, res) => {
            const url = req.headers.referer;
            var parts = url.split('/');
            var lastSegment = parts.pop()  // handle potential trailing slash
            const response = await Post.findById({ _id : lastSegment});
            res.send(response);
        })
}
















// 