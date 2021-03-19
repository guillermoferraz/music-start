const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const Avatar  = require('../models/avatar');
const { isAuthenticated } = require('../helpers/auth');


/*router.get('/myVideos', async (req, res) => {
  const videos = await Video.find().sort({createdAt: 'desc'}).lean();
  console.log({videos});
  res.render('home/myVideos', {videos});
});*/



router.post('/upload/video', async (req ,res) => {
  const { v_link, v_name, v_song, v_description } = req.body;
  const newVideo = new Video({v_link, v_name, v_song, v_description});
  newVideo.user = req.user.id;
  await newVideo.save();
  console.log(newVideo);
  res.redirect('/home')
});


router.get('/myVideos/?', isAuthenticated, async (req, res) => {
   const one = req.params.id || 1;
  const avatar = await Avatar.find({user: req.user.id})
    .limit(one)
    .sort({createdAt: 'desc'})
    .lean();
  res.render('home/myVideos', {avatar});
})

router.get('/myVideos/:page', isAuthenticated, async (req, res, next) => {


  let perPage = 2;
  let page = req.params.page || 1;


  const one = req.params.id || 1;
  const avatar = await Avatar.find({user: req.user.id})
    .limit(one)
    .sort({createdAt: 'desc'})
    .lean();

  Video
    .find({user: req.user.id})
    .sort({createdAt: 'desc'})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .lean()
    .exec((err, videos) => {
      Video.count((err, count) => {
        if (err) return next(err);
        res.render('home/myVideos', {
          avatar,
          videos,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
});
// edit

router.get('/myVideos/edit/:id', isAuthenticated, async (req, res) => {
  const video = await Video.findById(req.params.id).lean();
  res.render('home/myVideos_edit', {video});
});
router.put('/myVideos/edit/:id', isAuthenticated, async (req, res) => {
  const {v_link, v_name, v_song, v_description} = req.body;
  await Video.findByIdAndUpdate(req.params.id, {v_link, v_name, v_song, v_description});
  res.redirect('/myVideos/page');
})
router.delete('/myVideos/delete/:id', isAuthenticated, async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.redirect('/myVideos/page');
})



module.exports = router;
