const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');
const Avatar = require('../models/avatar');


router.get('/', (req, res) => {
  res.render('index');
});

router.post('/register', async (req, res) => {
  const {user, email, password} = req.body;
  const newUser = new User({user, email, password});
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  console.log(newUser);
  res.render('home/index');
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
}));
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
});


router.get('/home', isAuthenticated, async (req, res) => {
  const one = req.params.id || 1;
  const avatar = await Avatar.find({user: req.user.id})
    .limit(one)
    .sort({createdAt: 'desc'})
    .lean();
  console.log({avatar});
  res.render('home/index', {avatar} );
});

router.get('/profile', (req, res) => {
  res.render('profile/create');
});


module.exports = router;
