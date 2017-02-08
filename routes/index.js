var express = require('express');
var router = express.Router();
var Film = require('../models/films');
var multer  = require('multer');
var path = require('path');
var pars = require ('../parser');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'sample_movies.txt')
    }
});

var upload = multer({
    storage: storage
    ,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.txt') {
            return callback(console.log('Error! Upload only *.txt files!'))
        }
        callback(null, true)
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var films = Film.find(function (err,docs) {
    var filmChunk =[];
    var chunkSize = docs.length;
    for (var i = 0; i < docs.length; i += chunkSize) {
        filmChunk.push(docs.slice(i, i + chunkSize));
    }
    res.render('index', { title: 'My films',films:filmChunk });
  });
});  // home page

router.post('/add', function(req,res,next){
  var item = {
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    format: req.body.format,
    stars: req.body.stars
  };
  var data = new Film(item);
  data.save();
  res.redirect('/');
});  // add new film

router.post('/delete', function(req,res,next){
    console.log(req.body.removeId);
    Film.findByIdAndRemove(req.body.removeId).exec();
    res.redirect('/');
}); //delete film

router.post('/sort', function(req,res,next){
 var sortDB =   Film.find().sort({title: 1});
    sortDB.find(function (err, docs) {
        if (err) {
            console.log(err);
        }
        var filmChunk =[];
        var chunkSize = docs.length;
        for (var i = 0; i < docs.length; i += chunkSize) {
            filmChunk.push(docs.slice(i, i + chunkSize));
        }

        res.render('index',  { title: 'My films',films:filmChunk });
    });
});  // sort by title

router.post('/find', function(req,res,next){
   Film.find({$text: {$search: req.body.inputData}}, {score: {$meta: "textScore"}}, function (err, docs) {
       if (err) {
           return  console.log(err);
       }
       var filmChunk =[];
       var chunkSize = docs.length;
       for (var i = 0; i < docs.length; i += chunkSize) {
           filmChunk.push(docs.slice(i, i + chunkSize));
       }
       if (filmChunk.length < 1) {
          console.error('no input data')
       }

       res.render('index',  { title: 'My films',films:filmChunk});
   });
      /*.sort({score:{$meta:"textScore"}});*/
});   // Search movies

router.post('/upload',upload.single('myfile'),function (req,res){
    console.dir(req.file);
    res.redirect('/');
}); //upload movie list

router.post('/add_upload', function(req,res,next){
    var str = '';
    fs.readFile('uploads/sample_movies.txt', 'utf8', function(err, contents) {
        if (err) {
            return console.error(err)
        }
        str = contents;
        var arr = pars.pars(str);
         var item = {};
         for (var i = 0; i<arr.length; i++) {
         item = {
         title: arr[i].Title,
         releaseYear: arr[i].Year,
         format: arr[i].Format,
         stars: arr[i].Stars
         };
         var data = new Film(item);
         data.save();
         }
    });
    res.redirect('/');
});  // add new film

module.exports = router;

