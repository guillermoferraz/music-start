const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Avatar = require('../models/avatar');


router.post('/avatar', isAuthenticated, async (req, res) => {
  const avatar  = new Avatar();
  avatar.filename = req.file.filename;
  avatar.path = '/avatar/' + req.file.filename;
  avatar.mimetype = req.file.mimetype;
  avatar.size = req.file.size;
  avatar.user = req.user.id;
  avatar.alias = req.body.alias;
  await avatar.save();
  console.log(avatar);
  res.redirect('/home');
})

router.get('/create-avatar', isAuthenticated ,async (req, res) => {
  const one = req.params.id || 1;
  const avatar = await Avatar.find({user: req.user.id})
    .limit(one)
    .sort({createdAt: 'desc'})
    .lean();
  res.render('home/create-avatar', {avatar});
})
router.delete('/avatar/delete/:id/', isAuthenticated, async(req, res) => {
  await Avatar.findOneAndDelete(req.params.id);
  res.redirect('/create-avatar');
})
/*router.put('/avatar/:id', isAuthenticated, async (req, res) => {
  cosnt { avatar } = {
    avatar.filename = req.body.filename,
    avatar.path = '/avatar/' + req.file.filename,
    avatar.originalname = req.file.originalname,
    avatar.mimetype = req.file.mimetype;
    avatar.size = req.file.size,
    avatar.user = req.user.id;
    avatar.alias = req.body,
  }
  await Avatar.findByIdAndUpdate(req.params,id, { avatar });
  console.log({avatar});
})*/


module.exports = router;
