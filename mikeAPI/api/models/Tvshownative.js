/**
 * TvshowNative
 *
 * @module      :: Model for MongoDB native driver
 * @description :: Just to try MongoDB native driver
 */

module.exports = function(mongoose) {
  var schema = new mongoose.Schema({
   titleA: 	String,
   title: 		String,
   year: 		String,
   country: 	String,
   poster:  	String,
   seasons: 	String,
   genre: {
     type: String,
     enum: ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
   },
   summary: String
 });

 return mongoose.model('Tvshownative', schema);
}
