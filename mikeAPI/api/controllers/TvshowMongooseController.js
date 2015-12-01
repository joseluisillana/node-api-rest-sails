/**
* Mongoose ORM load
*/
var db = require('../services/mongooseService.js');

module.exports = {

crearMock: function (req, res) {
  var tvshowmongoose = db.Tvshowmongoose({
    title: 'LOST from mongoose',
    year: 2004,
    country: 'USA',
    poster: 'http://ia.media-imdb.com/images/M/MV5BMjA3NzMyMzU1MV5BMl5BanBnXkFtZTcwNjc1ODUwMg@@._V1_SY317_CR17,0,214,317_.jpg',
    seasons: '6',
    genre: 'Sci-Fi',
    summary: 'The survivors of a plane crash are forced to live with each other on a remote island, a dangerous new world that poses unique threats of its own'
  });
  tvshowmongoose.save(function (err, result) {
    if (err) return console.error(err);
    console.log('mymodel saved.');
    return res.status(200).jsonp(result);
  });
},

findAllTVShowsMongoose: function (req, res){
  db.Tvshowmongoose.find(function(err,results){
    if (err) return console.error(err);

    return res.status(200).jsonp(results);
  });
}

}
