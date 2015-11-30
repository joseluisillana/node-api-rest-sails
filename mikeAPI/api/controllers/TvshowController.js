/**
 * TvshowController
 *
 * @description :: Server-side logic for managing tvshows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//GET - Return all tvshows in the DB
	findAllTVShows : function(req, res){

		Tvshow.find().exec(function(err, tvshows){
	    if(err){
				console.log('M.I.K.E - [[ERROR]] GET ' + req.url);
	      res.send(500, { error: err.message });
	    }else{
	      console.log('M.I.K.E - GET ' + req.url);
	      res.status(200).jsonp(tvshows);
	    }
	  });
	},


	//GET - Return the tvshows with specified Id
	findById : function(req, res){

		var id = req.param('id',null);

		Tvshow.findOne(id).exec(
			function(err, tvshow){
	    	if(err){
					console.log('M.I.K.E - [[ERROR]] GET ' + req.url + req.params.id);
	      	res.send(500, err.message);
	    	}else{
	      	console.log('M.I.K.E - GET ' + req.url + req.params.id);
	      	res.send(200, JSON.stringify(tvshow));
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

  Tvshow.create(tvshow).exec(function(err,tvshow){
	    if (err){
	      console.log('M.I.K.E - ERROR Saving on DB');
	    	res.status(500).send(err.message);
	    }else{
	      console.log('M.I.K.E - OK Saving on DB');
	      res.status(200).jsonp(tvshow);
	    }
			res.status(200).jsonp(tvshow);
	  });
	},

	//PUT - Update a TVShow in the DB
	updateTVShow : function(req, res){
		var id = rep.param('id',null);
		Tvshow.findOne(id).done(function(err, tvshow){
	    console.log("M.I.K.E - Updating : " + req.params.id + " with title: " + tvshow.title);
	    console.log("M.I.K.E - New Data: " + req.body);
	    tvshow.title = req.body.title;
	    tvshow.year = req.body.year;
	    tvshow.country = req.body.country;
	    tvshow.poster = req.body.poster;
	    tvshow.seasons = req.body.seasons;
	    tvshow.genre = req.body.genre;
	    tvshow.summary = req.body.summary;

	    tvshow.save(function(err){
	      if (err){
	        console.log("M.I.K.E - ERROR Updating : " + req.params.id);
	        return res.status(500).send(err.message);
	      }else{
	        console.log("M.I.K.E - OK Updating : " + req.params.id);
	        res.status(200).jsonp(tvshow);
	      }
	    });

	  });
	},

	//DELETE - Delete a TVShow specified in the DB
	deleteTVShow : function(req, res){
		var id = rep.param('id',null);
		Tvshow.findOne(id).done(function(err, tvshow){
	    tvshow.remove(function(err){
	      if (err){
	        return res.status(500).send(err.message);
	      }else{
	        res.status(200).send();
	      }
	    })
	  });
	}


};
