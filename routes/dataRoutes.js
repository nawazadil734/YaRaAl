const mongoose = require('mongoose');
const User = mongoose.model('users');
const Community = mongoose.model('communities');

module.exports = (app) => {
        app.get('/api/community', async (req, res) => {
            const response = await Community.findOne({ title: 'Art'})
            res.send(response);
        });

        app.post('/api/loginUser', (req, res) => {
            User.findOne({ email: req.body.email})
                .then((existingUser) => {
                    if(existingUser) {
                        res.redirect('/');
                    } else {
                        res.redirect('/dashboard');
                        
                    }  
                })
        });

        
};