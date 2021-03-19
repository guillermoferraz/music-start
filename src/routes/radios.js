const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Radio = require('../models/radio');
const Avatar = require('../models/avatar');

/*router.get('/myRadios', async (req, res) => {
  const radios = await Radio.find().sort({createdAt: 'desc'}).lean();
  console.log({radios});
  res.render('home/myRadios', {radios});
});*/


router.post('/upload/radio', async (req ,res) => {
  const { r_link, r_name, r_description } = req.body;
  const newRadio = new Radio({ r_link, r_name, r_description });
  newRadio.user = req.user.id;
  await newRadio.save();
  console.log(newRadio);
  res.redirect('/home');

});

router.get('/myRadios/:page', isAuthenticated, async (req, res, next) => {


  let perPage = 3;
  let page = req.params.page || 1;

   const one = req.params.id || 1;
   const avatar = await Avatar.find({user: req.user.id})
    .limit(one)
    .sort({createdAt: 'desc'})
    .lean();

  Radio
    .find({user: req.user.id})
    .sort({createdAt: 'desc'})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .lean()
    .exec((err, radios) => {
      Radio.count((err, count) => {
        if (err) return next(err);
        res.render('home/myRadios', {
          avatar,
          radios,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
 });

//edit and delete

router.get('/myRadios/edit/:id', isAuthenticated, async (req, res) => {
  const radio = await Radio.findById(req.params.id).lean();
  res.render('home/myRadios_edit', {radio});
});
router.put('/myRadios/edit/:id', isAuthenticated, async (req, res) => {
  const {r_link, r_name, r_description} = req.body;
  await Radio.findByIdAndUpdate(req.params.id, {r_link, r_name, r_description});
  res.redirect('/myRadios/page');
})
router.delete('/myRadios/delete/:id', isAuthenticated, async (req, res) => {
  await Radio.findByIdAndDelete(req.params.id);
  res.redirect('/myRadios/page');
})


module.exports = router;
