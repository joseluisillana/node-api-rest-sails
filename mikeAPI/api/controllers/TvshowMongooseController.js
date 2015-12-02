/**
* Mongoose ORM load
*/
var mongodbService = require('../services/mongooseService.js');

module.exports = {

  findAll: function(req, res){
    console.log('M.I.K.E - GET ' + req.url);
    TVShowMongoose = mongodbService.mongoose.model('Tvshowmongoose');

    TVShowMongoose.find(function(err, result){
      if(err != null && err != undefined){
				console.log('M.I.K.E - [[ERROR]] GET ' + req.url);
	      res.status(500).jsonp(err);
	    }else{
	      console.log('M.I.K.E - GET ' + req.url);
	      res.status(200).jsonp(result);
	    }
    });
  },

  findById: function(req, res){
    console.log('M.I.K.E - GET ' + req.url + req.params.id);
    var entityId = req.param('id',null);
    if (entityId != null && entityId != undefined){
      TVShowMongoose = mongodbService.mongoose.model('Tvshowmongoose');

      var query  = TVShowMongoose.where('{ id: '+entityId+' }');
      query.findOne(function(err, result){
        if(err != null && err != undefined){
  				console.log('M.I.K.E - [[ERROR]] GET ' + req.url + req.params.id);
  	      res.status(500).jsonp(err);
  	    }else{
  	      console.log('M.I.K.E - GET ' + req.url + req.params.id);
  	      res.status(200).jsonp(result);
  	    }
      });
    }else{
      console.log('M.I.K.E - GET ' + req.url);
      res.status(400).jsonp("Bad Request : ");
    }
  },

  create: function(req, res){
    console.log('M.I.K.E - POST ' + req.url);
    console.log('M.I.K.E - BODY CONTENT: \n' + req.body + '\n');

    TVShowMongoose = mongodbService.mongoose.model('Tvshowmongoose');

    var entity = new TVShowMongoose({
      title : req.body.title,
      year : req.body.year,
      country : req.body.country,
      poster : req.body.poster,
      seasons : req.body.seasons,
      genre : req.body.genre,
      summary : req.body.summary
    });

    console.log('M.I.K.E - DATA TO STORE: \n############\n' + JSON.stringify(entity) +'\n#############\n');

    entity.save(function(err,result){
      if (err != null && err != undefined){
        console.log('M.I.K.E - ERROR Saving on DB');
        res.status(500).send('M.I.K.E - ERROR Saving on DB:\n'+ JSON.stringify(err) +'\n');
      }else if(result != null && result != undefined){
        console.log('M.I.K.E - OK Saving on DB');
        res.status(200).jsonp(result);
      }
    });


  },

  update: function(req, res){
    console.log('M.I.K.E - PUT ' + req.url + req.params.id);
    console.log('M.I.K.E - BODY CONTENT: \n' + JSON.stringify(req.body) + '\n');

    var entityId = req.param('id',null);
    if (entityId != null && entityId != undefined){
      TVShowMongoose = mongodbService.mongoose.model('Tvshowmongoose');

      TVShowMongoose.findById(entityId, function(err, result){
        if(err != null && err != undefined){
  				console.log('M.I.K.E - [[ERROR]] GET ' + req.url + req.params.id);
  	      res.status(500).jsonp(err);
  	    }else if (result != null && result != undefined){
          console.log("M.I.K.E - Updating : " + result.id + " with title: " + result.title);

          result.title = req.body.title;
          result.year = req.body.year;
          result.country = req.body.country;
          result.poster = req.body.poster;
          result.seasons = req.body.seasons;
          result.genre = req.body.genre;
          result.summary = req.body.summary

          console.log('M.I.K.E - New Data: \n' + JSON.stringify(result) + '\n');

          result.save(function(err,resultUpdate){
            if (err != null && err != undefined){
              console.log('M.I.K.E - ERROR Updating : ' + result.id +'\n Error info:' + JSON.stringify(err));
              res.status(500).send(JSON.stringify(err));
            }else if(resultUpdate != null && resultUpdate != undefined ){
              console.log('M.I.K.E - OK Updating : ' + result.id + ', Operation Result: '+ resultUpdate);
              res.status(200).send('M.I.K.E - OK Updating : ' + result.id);
            }else{
              res.status(500).send('M.I.K.E - [[ERROR]] Updating : ' + result.id + ', undetermined cause.');
            }
          });
        }else{
          console.log('M.I.K.E - PUT ' + req.url + req.params.id);
  	      res.status(200).send('M.I.K.E - [[ERROR]] Updating ' + req.params.id +'. Not Found in database.');
  	    }
      });
    }else{
      console.log('M.I.K.E - PUT ' + req.url + req.params.id);
      res.status(400).jsonp("Bad Request : ");
    }

  },

  delete: function(req, res){
    console.log('M.I.K.E - DELETE ' + req.url + req.params.id);

    var entityId = req.param('id',null);
    if (entityId != null && entityId != undefined){
      TVShowMongoose = mongodbService.mongoose.model('Tvshowmongoose');

      var query  = TVShowMongoose.where('{ id: '+entityId+' }');
      query.findOne(function(err, result){
        if(err != null && err != undefined){
          console.log('M.I.K.E - [[ERROR]] DELETE ' + req.url + req.params.id);
          res.status(500).jsonp(err);
        }else if (result != null && result != undefined){
          console.log("M.I.K.E - Deleting : " + result.id + " with title: " + result.title);

          TVShowMongoose.remove(result).exec(function(err){
            if (err != null && err != undefined){
              console.log('M.I.K.E - ERROR Deleting : ' + result.id);
              res.status(500).send('M.I.K.E - ERROR Deleting : ' + result.id + '\n' + JSON.stringify(err) + '\n');
            }else{
              console.log('M.I.K.E - M.I.K.E - OK Deleting : ' + result.id);
              res.status(200).send('M.I.K.E - M.I.K.E - OK Deleting : ' + result.id);
            }
          });
        }else{
          console.log('M.I.K.E - DELETE ' + req.url + req.params.id);
          res.status(200).jsonp(result);
        }
      });
    }else{
      console.log('M.I.K.E - DELETE ' + req.url + req.params.id);
      res.status(400).jsonp("Bad Request : ");
    }
  }

}
