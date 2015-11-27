/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		if(req.method=="POST"&&req.param("User",null)!=null)
		{
			User.create(req.param("User")).done(function(err,model){
				// Error handling
				if (err) {
					res.send("Error:Sorry!Something went Wrong");
				}else {
					res.send("Successfully Created!");
					//res.redirect( 'user/view/'+model.id);
				}
			});

		}
		else
		{
			res.render( 'user/create');
		}
	},

	index: function (req, res) {
		User.find().exec(function(err, users) {
			res.render( 'user/index',{'users':users});
			return;
		});
	},

	view: function (req, res) {
		var id=req.param("id",null);
		User.findOne(id).done(function(err,model){
			res.render( 'user/view',{'model':model});
		});
	},

	update: function (req, res) {
		var id=req.param("id",null);
		User.findOne(id).done(function(err, model) {
			if(req.method=="POST"&&req.param("User",null)!=null)
			{
				var usr=req.param("User",null);
				model.fname=usr.fName;
				model.mname=usr.mName;
				model.lname=usr.lName;
				model.dob=usr.dob;
				model.username=usr.Username;
				model.password=usr.password;
				model.email=usr.email;
				model.save(function(err){
					if (err) {
						res.send("Error");
					}else {
						res.redirect( 'user/view/'+model.id);
					}
				});
			}
			else{
				res.render( 'user/update',{'model':model});
			}
		});
	},

	destroy: function (req, res) {
		var id=req.param("id",null);
		User.findOne(id).done(function(err, usar) {
			usar.destroy(function(err) {
				res.redirect( 'user/index/');
				// record has been removed
			});
		});
	}

};
