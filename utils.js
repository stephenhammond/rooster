var request = require('request')
var messageMenuOptions = require('./messageMenuOptions.js')
var dialogOptions = require('./dialogOptions.js')
var blockOptions = require('./blockOptions.js')
var externalOptions = require('./messageMenuOptions.js').menuSelector("externalOptionsToBeFiltered","").options
var assert = require('assert')
var Promise = require('promise')

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var utils = {

  //basic function to send a message to Slack using the response URL included with requests
	sendMessageToSlackURL: function(responseURL, messageContent, responseOptions){
    if (messageContent && messageContent.response_type){
		  messageContent.response_type = responseOptions.response_type;
    }
    messageContent.replace_original = responseOptions.replace_original;
		var postOptions = {
			uri: responseURL,
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
		  },
			json: messageContent
	  }
	  request(postOptions, (err, response, body) => {
	  		if(err) throw err
        console.log(body)  
        console.log(err)
	  })
		  
	},
  
  // send a message using an app bot token 
  sendMessageAsBot: function(token, messageBody, channelID){
    var postData = messageBody;
    messageBody.channel = channelID;
    messageBody.as_user = false;

    var postOptions = {
			uri: process.env.SLACK_URL + "/api/chat.postMessage",
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
			},
			json: postData
	  };

    request(postOptions, (err, response, body) => {
      if(err) throw err
      console.log(body)
    })

	},
  
  // function to generate a random two character string that represents a playing card
  // special thanks to https://deckofcardsapi.com/ for making this possible 
  randomCardGenerator: function(){
    var suitOptions = ["H","S","D","C"]; // H = for hearts... you get the idea 
    var valueOptions = ["A","2","3","4","5","6","7","8","9","0","J","Q","K"]; // 0 is used for 10
    return valueOptions[Math.floor(Math.random()*valueOptions.length)] + suitOptions[Math.floor(Math.random()*suitOptions.length)];
  },
  
  // use this once app receives link_shared event 
  handleAppUnfurling: function(token, channel, ts, links, messageContent){
	  var data = {
	    "channel": channel,
	    "ts": ts,
	    "token": token
	  }
	  var unfurls = {}
    unfurls[links[0].url] = messageContent
    data["unfurls"] = JSON.stringify(unfurls)
    request.post(
      process.env.SLACK_URL + "/api/chat.unfurl",
      {
        form: data
      },
      function (err, response, body) {
        if(err) throw err
        console.log(body)
      }
    )  
	},
  openDialog: function(token, triggerID, dialogSelection){
		console.log("open dialog!!");
		var data = {
      token: token, //process.env.ACCESS_TOKEN,
		  trigger_id: triggerID,
		  dialog: JSON.stringify(dialogOptions.dialogSelector(dialogSelection))
		}

		request.post(
	          process.env.SLACK_URL + "/api/dialog.open",
		      {
		        form: data
		      },
		      function (error, response, body) {
		          if (!error && response.statusCode == 200) {
		            console.log("Success!")
		            console.log(body)
		          } else {
		            console.log("Fail")
		            console.log(error) 
		          }
		      }
	   	 )
	  },
  
  setTopic: function(token, topic, channelID){
		console.log("open dialog!!");
    var data = {
      token: token,
      channel: channelID,
      topic: topic
    }

    request.post(
        process.env.SLACK_URL + "/api/channels.setTopic",
        {
          form: data
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success!")
              console.log(body)
            } else {
              console.log("Fail")
              console.log(error) 
            }
        }
     )
  },
  createChannel: function(token, channelName, channelID){
		console.log("create channel!");
      var data = {
        token: token,
        name: channelName
      }
      request.post(
        process.env.SLACK_URL + "/api/channels.create",
        {
          form: data
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success!")
              console.log(body)
            } else {
              console.log("Fail")
              console.log(error) 
            }
        }
      )

    
        
	  },
    externalSearch: function(query){
      var results = []
      for(var i=0; i<externalOptions.length; i++) {
        if(externalOptions[i].label.indexOf(query)!=-1) {
            results.push(externalOptions[i])
        }
      }
      return results
    },
   createBlockMessage: function(blockSelections){
     console.log("Create block message util")
     console.log(blockSelections)
     return new Promise(
				function (resolve, reject) {
        
          var blocksArray = []
          for (var propName in blockSelections) { 
            if (blockSelections[propName] !== null) {
              blocksArray.push(blockOptions.blockSelector(blockSelections[propName]));
            }
            
          }
          
          var message = {
           "text": "*Here's your Block Kit message:*",
            "attachments":[
              {
                "blocks": blocksArray
                
            
              }
            ]
          }     
          console.log("message")
          console.log(message)
          resolve(message)
        })
				// return new Promise(
				// function (resolve, reject) {
				// mongodb.MongoClient.connect(uri, function(err, client) {
				// if(err) throw err
				// var db = client.db('bradslavin')
				// db.collection('app_installs').findOne({ team_id: teamID, bot:{$exists:true}}, function(err, doc) {
				// assert.equal(err, null)
				// console.log("Found the following bot token: ")
				// console.dir(doc.bot.bot_access_token)
				// resolve(doc.bot.bot_access_token)
				// reject(err)
				// 	})
				// 	client.close(function (err) {
				// if(err) throw err
				// })
				// })
				// }
				// )
    
   
   }
}

module.exports = utils