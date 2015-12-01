/**
 * TvshowController
 *
 * @description :: Server-side logic for managing tvshows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//GET - Return all tvshows in the DB
	findAllTVShows : function(req, res){

		Tvshow.find().exec(function(err, results){
	    if(err){
				console.log('M.I.K.E - [[ERROR]] GET ' + req.url);
	      res.send(500, { error: err.message });
	    }else{
	      console.log('M.I.K.E - GET ' + req.url);
	      res.status(200).jsonp(results);
	    }
	  });
	},


	//GET - Return the tvshows with specified Id
		findById : function(req, res){
			console.log('M.I.K.E - GET ' + req.url + req.params.id);
			var id = req.param('id',null);

			Tvshow.findOne(id).exec(
				function(err, result){
		    	if (err != null && err != undefined){
						console.log('M.I.K.E - [[ERROR]] GET ' + req.url + req.params.id);
		      	return res.status(500).jsonp(err);
		    	}else if(result != null && result != undefined){
		      	console.log('M.I.K.E - GET ' + req.url + req.params.id);
						console.log('M.I.K.E - GET el result ' + result);
		      	return res.status(200).jsonp(result);
		    	}else{
					  return res.status(500).send(500, "M.I.K.E - Data not found querying: " + req.params.id);
		    	}
		  	}
			);
	},

	//POST - Insert a new TVShow in the DB
	addTVShow : function(req, res){
	  console.log('M.I.K.E - POST');
	  console.log(req.body);

	  var tvshow = req.body;
	    tvshow.title = req.body.title,
	    tvshow.year = req.body.year,
	    tvshow.country = req.body.country,
	    tvshow.poster = req.body.poster,
	    tvshow.seasons = req.body.seasons,
	    tvshow.genre = req.body.genre,
	    tvshow.summary = req.body.summary

  console.log('M.I.K.E - DATA TO STORE: \n############\n' + JSON.stringify(tvshow) +'\n#############\n');

  Tvshow.create(tvshow).exec(function(err,result){
	    if (err != null && err != undefined){
	      console.log('M.I.K.E - ERROR Saving on DB');
	    	res.status(500).send(err.message);
	    }else if(result != null && result != undefined){
	      console.log('M.I.K.E - OK Saving on DB');
	      res.status(200).jsonp(result);
	    }
	  });
	},

	//PUT - Update a TVShow in the DB
	updateTVShow : function(req, res){
		var id = req.param('id',null);
		Tvshow.findOne().where(id).exec(function(err, result){
	    console.log("M.I.K.E - Updating : " + req.params.id + " with title: " + result.title);
	    console.log("M.I.K.E - New Data: " + JSON.stringify(req.body));
			console.log("M.I.K.E - err : " + JSON.stringify(err));
			console.log("M.I.K.E - result : " + JSON.stringify(result));
			if (err != null && err != undefined){
				console.log("M.I.K.E - An error has occurred querying: " + req.params.id + "\nError: " + JSON.stringify(err));
				return res.status(500).send(err.message);
			}else if(result == null && result == undefined){
				console.log("M.I.K.E - Data not found querying: " + req.params.id);
				return res.status(404).send("M.I.K.E - Data not found querying: " + req.params.id);
			}else{
				result.title = req.body.title;
		    result.year = req.body.year;
		    result.country = req.body.country;
		    result.poster = req.body.poster;
		    result.seasons = req.body.seasons;
		    result.genre = req.body.genre;
		    result.summary = req.body.summary;

				console.log('M.I.K.E - DATA TO UPDATE: \n############\n' + JSON.stringify(result) +'\n#############\n');

		    Tvshow.update(result.id, result).exec(function(err, resultUpdated){
					if (err != null && err != undefined){
					  console.log("M.I.K.E - ERROR Updating : " + req.params.id);
		        return res.status(500).send(err.message);
		      }else if(resultUpdated == null && resultUpdated == undefined){
						console.log("M.I.K.E - Data not found querying for update : " + result.id);
						return res.status(404).send("M.I.K.E - Data not found querying for update : " + result.id);
					}else{
					  console.log("M.I.K.E - OK Updating : " + resultUpdated.id);
		        return res.status(200).jsonp(resultUpdated);
		      }
		    });
			}
	  });
	},

	//DELETE - Delete a TVShow specified in the DB
	deleteTVShow : function(req, res){
		console.log("M.I.K.E - Attempt to delete : " + req.params.id);
		var id = req.param('id',null);
		Tvshow.findOne().where(id).exec(function(err, result){
			console.log("M.I.K.E - err : " + JSON.stringify(err));
			console.log("M.I.K.E - result : " + JSON.stringify(result));
			if (err != null && err != undefined){
				console.log("M.I.K.E - An error has occurred querying: " + req.params.id + "\nError: " + JSON.stringify(err));
				return res.status(500).send(err.message);
			}else if(result == null && result == undefined){
				console.log("M.I.K.E - Data not found querying: " + req.params.id);
				return res.status(404).send("M.I.K.E - Data not found querying: " + req.params.id);
			}else{
				Tvshow.destroy(result.id).exec(function(err){
					if (err){
						console.log("M.I.K.E - ERROR Deleting : " + req.params.id);
						return res.status(500).send(err.message);
					}else{
						console.log("M.I.K.E - OK Deleting : " + req.params.id);
						return res.status(200).send("M.I.K.E - OK Deleting : " + req.params.id);
					}
				});
			}
		});
	}


};
