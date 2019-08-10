const passport = require('passport');
const mongoose = require('mongoose');
const Community = mongoose.model('community');

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

        app.post('/api/createPost', (req, res) => {
            console.log(req.body);
            res.send({ hi : "adil"})
        })
}
















// 