// init project and Node modules
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var JSONParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));

// files that make app do things
var utils = require('./utils.js');
var commandMessageHandler = require('./commandMessageHandler.js');
var messageMenuOptions = require('./messageMenuOptions.js');
var databaseUtils = require('./databaseUtils.js');


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/install", (request, response) => {
  response.sendFile(__dirname + '/views/add_to_slack.html');
});

app.get('/auth/redirect', (req, res) =>{
	  var options = {
  	  uri: process.env.SLACK_URL + '/api/oauth.access?code='+req.query.code+'&client_id='+process.env.CLIENT_ID+'&client_secret='+process.env.CLIENT_SECRET+'&redirect_uri='+process.env.REDIRECT_URI,
		  method: 'GET'
  	}
  	request(options, (error, response, body) => {
  		var jsonResponse = JSON.parse(body)
  		console.log(jsonResponse)
  		if (!jsonResponse.ok){
  			console.log(jsonResponse)
  			res.send("Error encountered: \n"+JSON.stringify(jsonResponse)).status(200).end()
  		}else{
  			console.log(jsonResponse)
  			databaseUtils.saveInstallData(jsonResponse)
  			res.send("Success!")
  		}
  	})
})


// ROOSTER TIME

// endpoint used for web channel input textbox
app.post("/card-time", (req, res) => {
  res.status(200).end();
  var messageContent = {"text": "https://deckofcardsapi.com/static/img/" + utils.randomCardGenerator() + ".png"};
  utils.sendMessageAsBot(process.env.BOT_ACCESS_TOKEN, messageContent, "#" + req.query.channel); 
  //res.sendStatus(200);
});

// route to handle all slash command requests 
app.post('/slack/slash-commands/', urlencodedParser, (req, res) =>{
	var reqBody = req.body;
  console.log(reqBody)
	var responseURL = reqBody.response_url;
	if (reqBody.token !=  process.env.APP_VERIFICATION_TOKEN){
	  res.status(403).end("Access forbidden: The token for the slash command doesn't match.");
  }else{
    res.status(200).end();
    if (reqBody.command === "/draw-a-card"){
      if (reqBody.text === "help"){
        utils.sendMessageToSlackURL(responseURL, commandMessageHandler.help(), "");
      }else{
        utils.sendMessageToSlackURL(responseURL, commandMessageHandler.usersAndConversationsButtons(reqBody.text), "");
      }
    }else if (reqBody.command === "/dialog" || reqBody.command === "/dialogwta"){
      console.log(reqBody);
      return databaseUtils.getToken(reqBody.team_id).then(function(token){
				utils.openDialog(token, reqBody.trigger_id, reqBody.text);
			})
    }else if (reqBody.command === "/dialogbutton"){ // not used yet 
      console.log(reqBody);
      //utils.openDialog(token, reqBody.trigger_id, 5); // hardcoded to dialogOptions type 5 
    
    }
  }
	
});

// route to handles all actions from buttons and message menu interactions from user
app.post('/slack/actions', urlencodedParser, (req, res) =>{
	var actionJSONPayload = JSON.parse(req.body.payload) // parse URL encoded payload JSON string
  var callbackID = actionJSONPayload.callback_id
  console.log("action received")
  console.log(actionJSONPayload)
  if (actionJSONPayload.token !==  process.env.APP_VERIFICATION_TOKEN){
	  res.status(403).end("Access forbidden: The token for the slash command doesn't match.")
  }
  else if(actionJSONPayload.type == 'message_action' && actionJSONPayload.callback_id == "set_topic"){
    res.send('');
    console.log("set topic here")
    return databaseUtils.getToken(actionJSONPayload.team.id).then(function(token){
      utils.setTopic(token, actionJSONPayload.message.text, actionJSONPayload.channel.id)
    })
    
  }
  else if (actionJSONPayload.type == 'message_action' && actionJSONPayload.callback_id == "create_channel"){
    res.send('');
    return databaseUtils.getToken(actionJSONPayload.team.id).then(function(token){
			utils.openDialog(token, actionJSONPayload.trigger_id, 1)
    })
  }
  else if (actionJSONPayload.type == 'message_action'){
    res.send('');
    return databaseUtils.getToken(actionJSONPayload.team.id).then(function(token){
			utils.openDialog(token, actionJSONPayload.trigger_id, 5)
    })
  }
  else if(actionJSONPayload.type == 'dialog_submission' && actionJSONPayload.callback_id == "create_channel"){
    res.send('');
    console.log("create channel here")
    databaseUtils.getToken(actionJSONPayload.team.id).then(function(token){
			utils.createChannel(token, actionJSONPayload.submission.channelName)
    })
    
    
  //   var message = {
  //       "text": "Open your new channel",
  //       "channel": channelID,
  //       "attachments": [
  //       {
  //         "fallback": "Go to your new channel",
  //         "actions": [
  //           {
  //             "type": "button",
  //             "text": "Go: "+actionJSONPayload.submission.channelName,
  //             "url": "https://slack.com/app_redirect?channel=+"+channelID
  //           }
  //         ]
  //       }] 
  //     }
  }
  
  else if (actionJSONPayload.type == 'dialog_submission'){
    res.send('');
    var message = {
      "attachments": [
        {
          "text": "Dialog or Message Action success"
        }
      ]
		}
    var responseOptions = {}; 
    responseOptions.response_type = "in_channel";
    responseOptions.replace_original = "true";
    utils.sendMessageToSlackURL(actionJSONPayload.response_url, message, responseOptions);
    
  }else{
    var responseOptions = {}; // used as flag for replace, bot, webhook, etc options 
    switch (callbackID){  
      case 'destination_selection':
        //utils.openDialog(actionJSONPayload.trigger_id, 5)
        var menuType = actionJSONPayload.actions[0].value; // "users" or "conversations"
        var menuToSend = messageMenuOptions.menuSelector(menuType, "send_card");
        var responseOptions = {}; // used as flag for replace, bot, webhook, etc options
        responseOptions.response_type = "ephemeral";
        responseOptions.replace_original = "true";
        // send ephemeral menu to replace button message 
        utils.sendMessageToSlackURL(actionJSONPayload.response_url, menuToSend, responseOptions);
        res.send('');
        break; 
      case 'send_card':
        if (actionJSONPayload.type == "message_action"){
          var cardDestination = actionJSONPayload.message.user; //
        }else{
          var cardDestination = actionJSONPayload.actions[0].selected_options[0].value;
        }
        
        var messageContent = {"text": "https://deckofcardsapi.com/static/img/" + utils.randomCardGenerator() + ".png"};
        databaseUtils.getBotToken(actionJSONPayload.team.id).then(function(token){
		       utils.sendMessageAsBot(token, messageContent, cardDestination);
        })
       
        res.send('Card sent');
        break;
      default:
        console.log("shoot");
        res.status(200).end();                                                                                                                                         
    }
  }
  
});

app.post('/slack/events/', JSONParser, (req, res) =>{
	var event = req.body.event;
  console.log(event);
	if (req.body.challenge){
		if (req.body.token === process.env.APP_VERIFICATION_TOKEN){
			res.send(req.body.challenge);
		}else{
			res.status(403).end();
		}
	}else if (event.type === "link_shared"){
    // rooster.glitch.me links to unfurl some cards because this was in high demand from my millions users 
		res.status(200).end();
    var randomCard = {"text": "https://deckofcardsapi.com/static/img/" + utils.randomCardGenerator() + ".png"};
    var unfurlMessage = {"text": "Let\'s shuffle the deck! <@"+event.user+">"};
    databaseUtils.getToken(req.body.team_id).then(function(token){
			utils.handleAppUnfurling(token, event.channel, event.message_ts, event.links, unfurlMessage);
    })
    databaseUtils.getBotToken(req.body.team_id).then(function(token){
		  utils.sendMessageAsBot(token, randomCard, event.channel);
    })
	}
	else{
		res.status(200).end();
	}
});


app.post('/slack/options-load-point', urlencodedParser, (req, res) =>{
	// var body = JSON.parse(req)
	console.log("Request to /slack/options-load-point")
	
	var actionJSONPayload = JSON.parse(req.body.payload)
	console.log("Action sent to load URL:")
	console.log(actionJSONPayload)

	//console.log(messageMenuOptions.menuSelector("externalOptionsToBeFiltered"))
	if (actionJSONPayload.token == process.env.APP_VERIFICATION_TOKEN){
		//res.send(messageMenuOptions.menuSelector("externalOptionsToBeFiltered"))
		var results = {};
		results.options = utils.externalSearch(actionJSONPayload.value)
		console.log("results!!!")
    console.log(results)
		res.send(results)

	}else{
		res.status(403).end("Access forbidden")
	}

})

app.listen(process.env.PORT || 3000, () => {
    console.log('Rooster server launched!')
});
