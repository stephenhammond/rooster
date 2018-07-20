var request = require('request')
var messageMenuOptions = require('./messageMenuOptions.js')
var dialogOptions = require('./dialogOptions.js')
var blockOptions = require('./blockOptions.js')
var assert = require('assert')
var Promise = require('promise')
var utils = require('./utils.js')

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var listMethodsHandler = {

  //basic function to send a message to Slack using the response URL included with requests
	callMethodWithLimitAndCursor: function(token, method, limit, requestBody, cursor){
    console.log("call list method!!");
    //limit = 100 // just hardcoding for testing
		var data = {
      token: token,
      limit: limit,
      pretty: true
    }
    if (cursor){
      data.cursor = cursor
    }
    if (method == "reactions.list"){ // if reactions.list
      data.user = requestBody.user.id
    }
        
    if (method == "files.info"){ // if files.info
      data.file = "FBT0ENW6P" // hardcode file ID
    }   
        
    
		request.post(
          process.env.SLACK_URL + "/api/" + method,
        {
          form: data
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success!")
              console.log(body)
              var newCursor = JSON.parse(body).response_metadata.next_cursor
              console.log(newCursor) 
              if (newCursor){
                //post button to retrieve next "limit" amount
                var message = {
                  "text": "There are more results... click button to advance cursor",
                  "attachments": [
                    {
                      "fallback": "advance cursor",
                      "callback_id": "advance_cursor",
                      "color": "#70CADB",
                      "attachment_type": "default",
                      "actions": [
                        {
                          "name": method,
                          "text": "Cursor time!",
                          "type": "button",
                          "value": newCursor
                        }
                      ]
                    }
                  ]
                }
                utils.sendMessageAsBot(token, message, requestBody.channel.id)
              }else{
                // you're done
                utils.sendMessageAsBot(token, {"text":"No more results"}, requestBody.channel.id)
              }
              
            } else {
              console.log("Fail")
              console.log(error) 
            }
        }
     )
    
  },
  
  

    
}

module.exports = listMethodsHandler