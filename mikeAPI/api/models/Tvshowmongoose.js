/**
 * MyModel
 *
 * @module      :: Model
 * @description :: Just to try mongoose
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

 return mongoose.model('Tvshowmongoose', schema)
}
