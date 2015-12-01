/**
* Tvshow.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    titleA: 	{ type: 'string' },
		title: 		{ type: 'string' },
		year: 		{ type: 'integer' },
		country: 	{ type: 'string' },
		poster:  	{ type: 'string' },
		seasons: 	{ type: 'integer' },
		genre: 		{
			type: 'string',
			enum: ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
		},
		summary: 	{ type: 'string' }
	}
};
