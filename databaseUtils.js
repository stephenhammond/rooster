var mongodb = require('mongodb')
var assert = require('assert')
var uri = process.env.DB_URL
var Promise = require('promise')


var databaseUtils = {

	getUserAuthData: function(requestData, responseOptions){
		
		mongodb.MongoClient.connect(uri, function(err, client) {
  			if(err) throw err
  			var db = client.db('bradslavin')
  			db.collection('app_installs').findOne({ team_id: requestData.team.id}, function(err, doc) {
			    assert.equal(err, null)
			    console.log("Found the following records")
			    console.dir(doc)
			    return doc
		  	})
    	})
	},

	getWebhookURL: function(requestData, responseOptions){
		return new Promise(
	  		 function (resolve, reject) {
				    mongodb.MongoClient.connect(uri, function(err, client) {
		  			if(err) throw err
		  			var db = client.db('bradslavin')
		  			db.collection('app_installs').findOne({ team_id: requestData.team.id}, function(err, doc) {
					    assert.equal(err, null)
					    console.log("Found the following records")
					    console.dir(doc.incoming_webhook.url)
            			resolve(doc.incoming_webhook.url)
            			reject(err)
					})
					client.close(function (err) {
          			if(err) throw err
       		})
				})
    		}
    	)
	},

	getBotToken: function(requestData, responseOptions){
		return new Promise(
	  		function (resolve, reject) {
				mongodb.MongoClient.connect(uri, function(err, client) {
		  			if(err) throw err
		  			var db = client.db('bradslavin')
		  			db.collection('app_installs').findOne({ team_id: requestData.team.id, bot:{$exists:true}}, function(err, doc) {
					    assert.equal(err, null)
					    console.log("Found the following bot token: ")
					    console.dir(doc.bot.bot_access_token)
            			resolve(doc.bot.bot_access_token)
            			reject(err)
					})
					client.close(function (err) {
		              	if(err) throw err
		             })
				})
    		}
    	)
	},

	saveInstallData: function(oauthResponse){
  		mongodb.MongoClient.connect(uri, function(err, client) {
  			//if(err) throw err
        console.log(err)
  			var db = client.db('bradslavin');
  			db.collection('app_installs').insert(oauthResponse, function(err, result) {
    			if(err) throw err

    		})

    	 	client.close(function (err) {
             	if(err) throw err
            })
    	})

	},

	getAppTokenForUnfurl: function(teamID){
		return new Promise(
	  		function (resolve, reject) {
				mongodb.MongoClient.connect(uri, function(err, client) {
		  			if(err) throw err
		  			var db = client.db('bradslavin')
		  			db.collection('app_installs').findOne({ team_id: teamID, scope: /links/}, function(err, doc) {
					    assert.equal(err, null)
					    console.log("Found the following bot token: ")
					    console.log(doc.access_token)
					    
            			resolve(doc.access_token)
            			reject(err)
					})
					 client.close(function (err) {
		             	if(err) throw err
		       })
				})
    		}
    	)
	},
}


module.exports = databaseUtils