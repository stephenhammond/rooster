var mongodb = require('mongodb')
var assert = require('assert')
var uri = process.env.DB_URL
var Promise = require('promise')


var databaseUtils = {

	getToken: function(teamID,dbCollection){
		return new Promise(
      function (resolve, reject) {
        mongodb.MongoClient.connect(uri, function(err, client) {
          if(err) reject(err)
          var db = client.db('bradslavin')
          db.collection(dbCollection).findOne({ team_id: teamID}, function(err, doc) {
            assert.equal(err, null)
            console.log("Found the following records")
            console.dir(doc)
            resolve(doc.access_token)   
          })
        })
      }    
    )    
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

	getBotToken: function(teamID, responseOptions){
		return new Promise(
	  		function (resolve, reject) {
				mongodb.MongoClient.connect(uri, function(err, client) {
          if(err) throw err
          var db = client.db('bradslavin')
          db.collection('app_installs').findOne({ team_id: teamID, bot:{$exists:true}}, function(err, doc) {
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
        var dbCollection = 'app_installs';
        console.log(err)
        if(oauthResponse.app_id == "A628U0LN7"){
          dbCollection = 'wta_installs';
        }

  			var db = client.db('bradslavin');
  			db.collection(dbCollection).insert(oauthResponse, function(err, result) {
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