var mongodb = require('mongodb')
var assert = require('assert')
var uri = process.env.DB_URL
var Promise = require('promise')
var utils = require('./utils.js')


var databaseUtils = {

	getToken: function(teamID,dbCollection,userID){
		return new Promise(
      function (resolve, reject) {
        mongodb.MongoClient.connect(uri, function(err, client) {
          if(err) reject(err)
          var db = client.db('bradslavin')
          db.collection(dbCollection).findOne({ team_id: teamID}, function(err, doc) {
            assert.equal(err, null)
            console.log("Success: Found the token")
            //console.dir(doc)
            resolve(doc.access_token)   
          })
        })
      }    
    )    
	},
  
  getUserToken: function(teamID,dbCollection,userID){
		return new Promise(
      function (resolve, reject) {
        mongodb.MongoClient.connect(uri, function(err, client) {
          if(err) reject(err)
          var db = client.db('bradslavin')
          db.collection(dbCollection).findOne({ user_id: userID}, function(err, doc) {
            assert.equal(err, null)
            console.log("Success: Found the token")
            console.dir(doc)
            resolve(doc.access_token)   
          })
        })
      }    
    )    
	},


	getWebhookURL: function(teamID){
		return new Promise(
       function (resolve, reject) {
          mongodb.MongoClient.connect(uri, function(err, client) {
          if(err) throw err
          var db = client.db('bradslavin')
          db.collection('app_installs').findOne({ team_id: teamID}, function(err, doc) {
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

	getBotToken: function(teamID){
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
  
  refreshTokens: function(appID){
      // return new Promise(
          //function (resolve, reject) {
            mongodb.MongoClient.connect(uri, function(err, client) {
             // if(err) reject(err)
              var db = client.db('bradslavin')
              db.collection('wta_installs').find({app_id: appID}).toArray(function(err, doc) {
                assert.equal(err, null)
                console.log("Success: ")
                doc.forEach(function(record){
                  if (record.refresh_token){
                   // db.collection('wta_installs').deleteOne({access_token: record.access_token},function(err, result) {
                      //assert.equal(err, null);
                      //assert.equal(1, result.result.n);
                      //console.log("Removed the document with the field a equal to 3");
                      //callback(result);
                      console.log(record.refresh_token)
                      utils.oauthAccessRefresh(record.refresh_token).then(function(newToken){
                          db.collection('wta_installs').updateOne({ refresh_token: record.refresh_token }, { $set: { access_token: newToken.access_token } }, function(err, result) {
                          // assert.equal(err, null);
                          // assert.equal(1, result.result.n);
                          // console.log("Updated the document with the field a equal to 2");
                          // callback(result);
                        });  
                      
                      
                      })
                   // })
                  }
                  
                });
              
                //console.dir(doc)
                //resolve(doc)   
              })
            })
         // }    
       // )    

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
	}
}


module.exports = databaseUtils