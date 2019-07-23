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
    if (messageContent){// && messageContent.response_type){
		  messageContent.response_type = responseOptions.response_type;
    }
    //messageContent.response_type = "ephemeral"
    messageContent.replace_original = false;
    
		var postOptions = {
			uri: responseURL,
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
		  },
			json: messageContent
	  }
	  request(postOptions, (err, response, body) => {
	  		if(err) throw err
        console.log(body)  
        console.log(err)
	  })
		  
	},
  sendMessageToThreadUsingWebhook: function(webhookURL, threadTS, messageContent){
    messageContent.thread_ts = threadTS
    //messageContent.thread_ts = ""
    messageContent.reply_broadcast = true
    messageContent.icon_emoji = ":smile:"
    messageContent.username = "Custom Username with emoji icon"
    messageContent.channel = "#rooster-app"
    //messageContent.icon_url = "https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-03-07/326533967701_69b9a39487ce763a1326_36.png"
		var postOptions = {  
			uri: webhookURL,
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
  sendMessageAsBot: function(token, messageBody, channelID, threadTS){
    var postData = messageBody;
    messageBody.channel = channelID;
    //messageBody.as_user = true;
    if (threadTS){
      postData.thread_ts = threadTS
    }

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
  createScheduledMessageAsBot: function(token, messageBody, channelID, threadTS, postAt){
    return new Promise(
      function (resolve, reject) {
        messageBody.channel = channelID;
        var postData = messageBody;
        
        postData.as_user = true;
        if (threadTS){
          postData.thread_ts = threadTS
        }
        postData.post_at = postAt;
       
       console.log("********** POST DATA **********")
       console.log(postData)
        
        var postOptions = {
          uri: process.env.SLACK_URL + "/api/chat.scheduleMessage",
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          json: postData
        };
        
        // silly for loop for testing rate limiting
        //for (var i = 0; i < 100; i++){
          request(postOptions, (err, response, body) => {
            if(err) throw err
            console.log(body)
            resolve(body.scheduled_message_id)
          })
       // }
        
        
      })

	},
  deleteScheduledMessage: function(token, scheduledMessageID, channelID){
    return new Promise(
      function (resolve, reject) {
        var postData = {};
        postData.channel = channelID;
        postData.scheduled_message_id = scheduledMessageID;
        //postData.scheduled_message_id = "QGNMN1XN2";
        //messageBody.as_user = true;
        // if (threadTS){
        //   postData.thread_ts = threadTS
        // }
        // postData.post_at = postAt;

        var postOptions = {
          uri: process.env.SLACK_URL + "/api/chat.deleteScheduledMessage",
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
          resolve(body)
        })
        
        
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
  handleFileUnfurling: function(token, channel, ts, links, messageContent){
   return new Promise(
      function (resolve, reject) {
        var data = {
          "channel": channel,
          "ts": ts,
          "token": token
        }
        var unfurls = {}
        unfurls[links[0].url] = messageContent
        unfurls[links[0].url].hide_color = true
        data["unfurls"] = JSON.stringify(unfurls)
        request.post(
          process.env.SLACK_URL + "/api/chat.unfurl",
          {
            form: data
          },
          function (err, response, body) {
            if(err) throw err
            console.log(body)
          
            var promiseResolve = {
              "response": body,
              "postData": data
            }
            resolve(promiseResolve)
          }
        )  
      })
	},
  
  openDialog: function(token, triggerID, dialogSelection, dialogState, channelID){
		console.log("open dialog!!");
		var data = {
      token: token, //process.env.ACCESS_TOKEN,
		  trigger_id: triggerID,
		  dialog: JSON.stringify(dialogOptions.dialogSelector(dialogSelection, dialogState, channelID))
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
  openDialogWithState: function(token, triggerID, stateInput){
		console.log("open dialog!!");
		var data = {
      token: token, //process.env.ACCESS_TOKEN,
		  trigger_id: triggerID,
		  dialog: JSON.stringify(dialogOptions.dialogSelector("state", stateInput))
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
   createBlockMessage: function(blockSelections, randomFlag, topLevel){
     console.log("Create block message util")
     console.log(blockSelections)
     function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }
     if (randomFlag){
        blockSelections = {
          block_1: 2, //getRandomArbitrary(1,25),
          block_2: 10, //getRandomArbitrary(1,25),
          block_3: 13, //getRandomArbitrary(1,25),
          block_4: 5, //getRandomArbitrary(1,25),
          block_5: 3, //getRandomArbitrary(1,25),
          block_6: 25,//getRandomArbitrary(1,25),
          block_7: 14,// getRandomArbitrary(1,25),
          block_8: 12,// getRandomArbitrary(1,25),
          block_9: 16,// getRandomArbitrary(1,25),
          block_10: 19//getRandomArbitrary(1,25)
        }
//          blockSelections ={ block_1: 22,

//             block_2: 19,

//             block_3: 4,

//             block_4: 4,

//             block_5: 6,

//             block_6: 21,

//             block_7: 19,

//             block_8: 1,

//             block_9: 1,

//             block_10: 3 
//          }
       }
       
     
     console.log(blockSelections)
     return new Promise(
				function (resolve, reject) {
        
          var blocksArray = []
          for (var propName in blockSelections) { 
            if (blockSelections[propName] !== null) {
              blocksArray.push(blockOptions.blockSelector(blockSelections[propName]));
              //blocksArray.push(blockOptions.blockSelector(blockSelections[propName]));
            }
            
          }
          if(topLevel){
            var message = {
              "blocks": blocksArray
            }
          
          }else{
          
            var message = {
              //"text": "*Here's your Block Kit message:*",
              "blocks": blocksArray
//               "attachments":[
//                 {
//                   "blocks": blocksArray


//                 }
//               ]
            } 
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
    
   
   },
   createRandomString: function(length) {
     return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1)
   },
  
   oauthAccessRefresh: function(refreshToken){
     // console.log(req)
     return new Promise(
       function (resolve, reject) {
          var options = {
            uri: process.env.SLACK_URL + '/api/oauth.access?grant_type=refresh_token&client_id='+process.env.CLIENT_ID_WTA+'&client_secret='+process.env.CLIENT_SECRET_WTA+'&refresh_token='+refreshToken,
            method: 'GET'
          }
          request(options, (error, response, body) => {
            var jsonResponse = JSON.parse(body)
            //console.log(jsonResponse)
            if (!jsonResponse.ok){
              reject(jsonResponse)
              //res.send("Error encountered: \n"+JSON.stringify(jsonResponse)).status(200).end()
            }else{
              console.log("Refresh response:")
              console.log(jsonResponse)
              resolve(jsonResponse)
              //databaseUtils.saveInstallData(jsonResponse)
              //res.send("Success!")
            }
          })
       })
   }
  
}

module.exports = utils