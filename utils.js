var request = require('request')
var messageMenuOptions = require('./messageMenuOptions.js')

var utils = {

  //basic function to send a message to Slack using the response URL included with requests
	sendMessageToSlackURL: function(responseURL, messageContent, responseOptions){
		messageContent.response_type = responseOptions.response_type;
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
	  	})
		  
	},
  
  // send a message using an app bot token 
  sendMessageAsBot: function(token, messageBody, channelID){
    var postData = messageBody;
    messageBody.channel = channelID;

    var postOptions = {
			uri: "https://slack.com/api/chat.postMessage",
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
      "https://slack.com/api/chat.unfurl",
      {
        form: data
      },
      function (err, response, body) {
        if(err) throw err
        console.log(body)
      }
    )  
	}
}

module.exports = utils

