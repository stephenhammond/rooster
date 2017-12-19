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


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// ROOSTER TIME

// endpoint used for web channel input textbox
app.post("/card-time", function (req, res) {
  var messageContent = {"text": "https://deckofcardsapi.com/static/img/" + utils.randomCardGenerator() + ".png"};
  utils.sendMessageAsBot(process.env.BOT_ACCESS_TOKEN, messageContent, "#" + req.query.channel); 
  res.sendStatus(200);
});

// route to handle all slash command requests 
app.post('/slack/slash-commands/', urlencodedParser, (req, res) =>{
	var reqBody = req.body;
	var responseURL = reqBody.response_url;
	if (reqBody.token !=  process.env.APP_VERIFICATION_TOKEN){
	  res.status(403).end("Access forbidden: The token for the slash command doesn't match.");
  }else{
    if (reqBody.command === "/draw-a-card"){
      if (reqBody.text === "help"){
        utils.sendMessageToSlackURL(responseURL, commandMessageHandler.help(), "");
      }else{
        utils.sendMessageToSlackURL(responseURL, commandMessageHandler.buttonMenuOptions(reqBody.text), "");
      }
    }
  }
	res.status(200).end();
});

// route to handles all actions from buttons and message menu interactions from user
app.post('/slack/actions', urlencodedParser, (req, res) =>{
	var actionJSONPayload = JSON.parse(req.body.payload); // parse URL encoded payload JSON string
  var callbackID = actionJSONPayload.callback_id;
  
  if (actionJSONPayload.token !==  process.env.APP_VERIFICATION_TOKEN){
	  res.status(403).end("Access forbidden: The token for the slash command doesn't match.")
  }else{
    var responseOptions = {}; // used as flag for replace, bot, webhook, etc options 
    switch (callbackID){  
      case 'destination_selection':
        var menuType = actionJSONPayload.actions[0].value; // "users" or "conversations"
        var menuToSend = messageMenuOptions.menuSelector(menuType, "send_card");
        var responseOptions = {}; // used as flag for replace, bot, webhook, etc options
        responseOptions.response_type = "ephemeral";
        responseOptions.replace_original = "true";
        // send ephemeral menu to replace button message 
        utils.sendMessageToSlackURL(actionJSONPayload.response_url, menuToSend, responseOptions);
        res.status(200).end();
        break; 
      case 'send_card':
        var cardDestination = actionJSONPayload.actions[0].selected_options[0].value;
        var messageContent = {"text": "https://deckofcardsapi.com/static/img/" + utils.randomCardGenerator() + ".png"};
        utils.sendMessageAsBot(process.env.BOT_ACCESS_TOKEN, messageContent, cardDestination);
        res.status(200).end();
        break;
      default:
        console.log("shoot");
        res.status(200).end();                                                                                                                                         
    }
  }
  
});

app.post('/slack/events/', JSONParser, (req, res) =>{
	var event = req.body.event;
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
    var unfurlMessage= {"text": "Let\'s shuffle the deck!"};
		utils.handleAppUnfurling(process.env.ACCESS_TOKEN, event.channel, event.message_ts, event.links, unfurlMessage);
    utils.sendMessageAsBot(process.env.BOT_ACCESS_TOKEN, randomCard, event.channel);
	}
	else{
		res.status(200).end();
	}
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Rooster server launched!')
});
