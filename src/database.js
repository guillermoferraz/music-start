const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://guillermo:hacker190490@cluster0.ks08x.mongodb.net/MusicStart?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

  .then(db => console.log('Data base Music Start is connected'))
  .catch(err => console.log('err'));
