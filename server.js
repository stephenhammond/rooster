// init project and Node modules
const express = require('express')
const app = express()
const https = require('https')
const request = require('request')
const fs = require('fs')
const bodyParser = require('body-parser')
const JSONParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const fileUpload = require('express-fileupload')
const cron = require('node-cron')
 

app.use(express.static('public'))
app.use(fileUpload())
app.use(express.static('files'))
app.set('view engine', 'pug')


// var options = {
//     host: 'platform-tls-client.slack.com',
//     port: 443,
//     method: 'GET'
// };

// var req = https.request(options, function(res) {
//     console.log(res.connection.getPeerCertificate());
// });

// req.end();

// const server = https.createServer({
//   cert: fs.readFileSync('./cert.crt'),
//   key: fs.readFileSync('./private.key'),
//   ca: fs.readFileSync('./chain.pem'),
//   requestCert: true,
//   rejectUnauthorized: true,
// }, app)


// app.on('tlsClientError', (err, socket) => {
//   console.log(`req at ${new Date().toString()}:`)
//   console.log(`\ttlsClientError: ${err}`)
// })

// app.on('response', function (res) {
//   console.log("here")
//   console.log('peerCertificate:',res.socket.getPeerCertificate());
//   console.log('authorized:',res.socket.authorized);
//   console.log('authorizationError:',res.socket.authorizationError);
// });


// app.all('/*', (req, res) => {
//   const cert = req.socket.getPeerCertificate()
//   //if (cert && cert.subject) {
//     console.log(`\tpeer cert CN: ${cert.subject.CN}`)
//   //}
//   res.end("ok")
// })

// const socket = require('tls').connect(443, "platform-tls-client.slack.com", () => {
//   console.log('client connected',
//     socket.authorized ? 'authorized' : 'unauthorized');
//   process.stdin.pipe(socket);
//   process.stdin.resume();
// });


// var opts = {
//   domains: [ 'rooster.glitch.me']
// , email: 'shammond@slack-corp.com'
// , agreeTos: true                  // Accept Let's Encrypt v2 Agreement
// , communityMember: false           // Help make Greenlock better by submitting
//                                   // stats and getting updates
// };


// // ////////////////////
// // // INIT GREENLOCK //
// // ////////////////////

// var greenlock = require('greenlock').create({
//   version: 'draft-11'
// , server: 'https://acme-v02.api.letsencrypt.org/directory'
// , configDir: '/tmp/acme/etc'
// });
// app.use('/', greenlock.middleware());

// ///////////////////
// // GET TLS CERTS //
// ///////////////////

// greenlock.register(opts).then(function (certs) {
//   console.log("CERTS!");
//   console.log(certs);
//   // privkey, cert, chain, expiresAt, issuedAt, subject, altnames
// }, function (err) {
//   console.error(err);
// });

// greenlock.check({ domains: [ 'rooster.glitch.me' ] }).then(function (results) {
//   console.log(results)
// });

// files that make app do things
var utils = require('./utils.js')
var commandMessageHandler = require('./commandMessageHandler.js')
var messageMenuOptions = require('./messageMenuOptions.js')
var databaseUtils = require('./databaseUtils.js')
var listMethodsHandler = require('./listMethodsHandler.js')
var filesUtils = require('./filesUtils.js')
var base64Img = require('base64-img')

//refresh tokens
cron.schedule('0,24 * * * *', () => {
  // refresh Rooster WTA
  databaseUtils.refreshTokens("A628U0LN7")
})


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/install", (request, response) => {
  response.sendFile(__dirname + '/views/add_to_slack.html')
})

app.get('/file_viewer', (request, response) => {
  filesUtils.getFileFromID(request.query.id).then(function(fileData){
    response.send(fileData.data).status(200)
     // <img src="data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA..." width="100" height="50" alt="base64 test">
      //filesUtils.base64ToFile(fileData.data, fileData.mimetype)
    // var image64 = fileData.data
    // console.log("here's your data:")
    // console.log(image64)
    // // image64 = new Buffer(image64, 'base64')
    // response.render('file_viewer', { title: 'RoosterBox', mimetype:"image/png", image: image64, fileName: fileData.name })
    
  })
  
})

app.get("/files", (request, response) => {
  console.log(request.query.id)
  if (request.query.id){
    filesUtils.getFileFromID(request.query.id).then(function(fileData){
      
       var img = new Buffer(fileData.data, 'base64');

       response.writeHead(200, {
         'Content-Type': 'image/png',
         'Content-Length': img.length
       });
       response.end(img); 
      //response.send().status(200)
     // <img src="data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA..." width="100" height="50" alt="base64 test">
      //filesUtils.base64ToFile(fileData.data, fileData.mimetype)
    })
    
  }else{
    response.sendFile(__dirname + '/views/files.html')
  }
})



app.get('/auth/redirect', (req, res) =>{
  console.log(req)
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

app.get('/auth/redirect/wta', (req, res) =>{
  console.log(req)
  var options = {
    uri: process.env.SLACK_URL + '/api/oauth.access?code='+req.query.code+'&client_id='+process.env.CLIENT_ID_WTA+'&client_secret='+process.env.CLIENT_SECRET_WTA+'&redirect_uri='+process.env.REDIRECT_URI_WTA,
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
      //res.send(jsonResponse.logs)
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
})

// route to handle all slash command requests 
app.post('/slack/slash-commands/', urlencodedParser, (req, res) =>{
	var reqBody = req.body
  console.log(reqBody)
	var responseURL = reqBody.response_url
	if (reqBody.token !=  process.env.APP_VERIFICATION_TOKEN && reqBody.token !=process.env.APP_VERIFICATION_TOKEN_WTA){
	  res.status(403).end("Access forbidden: The token for the slash command doesn't match.")
  }else{
    res.status(200).end()
    var dbCollection = 'app_installs'
  
    if (reqBody.token ==  process.env.APP_VERIFICATION_TOKEN_WTA){
      dbCollection = 'wta_installs'
    }
    if (reqBody.command === "/draw-a-card"){
      //res.send(testMessage)
      if (reqBody.text === "help"){
        utils.sendMessageToSlackURL(responseURL, commandMessageHandler.help(), "")
     // }if (reqBody.text === "test"){
        //utils.sendMessageToSlackURL(responseURL, testMessage, "")
      //  res.send(testMessage)
      }else{
        utils.sendMessageToSlackURL(responseURL, commandMessageHandler.usersAndConversationsButtons(reqBody.text), "")
      }
    }else if (reqBody.command === "/rooster-block" || reqBody.command === "/block-kit-wta"){
      console.log(reqBody)
      console.log("DB COLLECTION!!")
      console.log(dbCollection)
      return databaseUtils.getToken(reqBody.team_id, dbCollection).then(function(token){
				utils.openDialog(token, reqBody.trigger_id, "blocks", reqBody.text)
			})
    }else if (reqBody.command === "/rooster-hook-thread"){
      //res.send(200).end()
      console.log(reqBody)
      console.log("DB COLLECTION!!")
      var webhookURL = "https://hooks.slack.com/services/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"
      var message = commandMessageHandler.usersAndConversationsButtons("")
      message.reply_broadcast = false
      
          // {
          //   "text":"The time is: <!date^"+Math.round(Date.now()/1000)+"^{time}|current time>",
          //   //"reply_broadcast": true
          // }
      //return databaseUtils.getWebhookURL(reqBody.team_id).then(function(webhookURL){
        utils.sendMessageToThreadUsingWebhook(webhookURL, reqBody.text, message)
      //})
    }
    else if (reqBody.command === "/dialog" || reqBody.command === "/dialogwta"){
      console.log(reqBody)
      return databaseUtils.getToken(reqBody.team_id, dbCollection).then(function(token){
				utils.openDialog(token, reqBody.trigger_id, reqBody.text)
			})
      
    }else if (reqBody.command === "/dialogstate"){
      console.log(reqBody)
      return databaseUtils.getToken(reqBody.team_id, dbCollection).then(function(token){
				utils.openDialogWithState(token, reqBody.trigger_id, reqBody.text)
			})
    }else if (reqBody.command === "/dialogbutton"){ // not used yet 
      console.log(reqBody)
      //utils.openDialog(token, reqBody.trigger_id, 5); // hardcoded to dialogOptions type 5 
    
    }else if (reqBody.command === "/lists" || reqBody.command === "/listswta"){ // not used yet 
      console.log(reqBody)
      //utils.openDialog(token, reqBody.trigger_id, 5); // hardcoded to dialogOptions type 5 
      var menuToSend = messageMenuOptions.menuSelector("paginationMethods", "")
      var responseOptions = {}; // used as flag for replace, bot, webhook, etc options
      responseOptions.response_type = "ephemeral"
      responseOptions.replace_original = "true"
      // send ephemeral menu to replace button message 
      utils.sendMessageToSlackURL(responseURL, menuToSend, responseOptions)
    
    }else if (reqBody.command === "/searchfiles"){ // not used yet 
      //WORK IN PROGRESSS
      console.log(reqBody)
      // filesUtils.getAllFilesForTeam(reqBody.team_id).then(function(files){
      //   console.log("in /listfiles with all files")
      var dbCollection = 'wta_installs'
      // var externalID = req.body.externalID
      // var externalURL = req.body.externalURL
      // var fileID = req.body.fileID
      // var preview = req.body.filePreview
      // var title = req.body.fileTitle
      var searchBlock =  { 
        block_1: '26',
        block_2: '27',
        block_3: '28',
        block_4: '29',
        block_5: '30' 
      }
      utils.createBlockMessage(searchBlock).then(function(message){
			  databaseUtils.getToken(reqBody.team_id, dbCollection).then(function(token){
			    utils.sendMessageAsBot(token, message, reqBody.channel_id)
		    })
      })
    
    
    }else if (reqBody.command === "/listfiles"){ // not used yet 
      console.log(reqBody)
      // filesUtils.getAllFilesForTeam(reqBody.team_id).then(function(files){
      //   console.log("in /listfiles with all files")
      
      var dbCollection = 'wta_installs'
    
      databaseUtils.getToken(reqBody.team_id, dbCollection).then(function(token){
        
        utils.openDialog(token, reqBody.trigger_id, "filesList")
      })
      
    
      //utils.openDialog(token, reqBody.trigger_id, 5); // hardcoded to dialogOptions type 5 
    
    }
  }
	
})

// route to handles all actions from buttons and message menu interactions from user
app.post('/slack/actions', urlencodedParser, (req, res) =>{
  console.log("action received")
	var actionJSONPayload = JSON.parse(req.body.payload) // parse URL encoded payload JSON string
  var callbackID = actionJSONPayload.callback_id
  console.log(actionJSONPayload)
  var dbCollection = 'app_installs'
  if (actionJSONPayload.callback_id == 'Callback_TOCHelp' ){
    var newMessage = {
      "text": "wave Hi there! Here are some methods to contact us:",
      "attachments": [{
        "fallback": "",
        "color": "#42a5f5",
        "pretext": "",
        "author_name": "",
        "title": "",
        "text": "",
        "fields": [{
          "title": "",
          "value": "Call the TOC: 1-123-456-7890",
          "short": false
        }, {
          "title": "",
          "value": "Support Slack channel: <slack://channel?team=T5FPG1QQ0&id=C2K2RJM6J|#toc>",
          "short": false
        }, {
          "title": "",
          "value": "Email support: email@example.com",
          "short": false
        }, {
          "title": "",
          "value": "TOCBot feedback: email@example.com",
          "short": false
        }],
        "footer": "",
        "actions": [],
        "mrkdwn_in": ["text", "pretext", "fields"],
        "callback_id": ""
      }, {
        "fallback": "",
        "color": "#008000",
        "pretext": "",
        "author_name": "",
        "title": "",
        "text": "point_down",
        "fields": [],
        "footer": "",
        "actions": [{
          "name": "CONTINUE",
          "text": "Main Menu",
          "type": "button",
          "value": "CONTINUE",
          "url": "",
          "options": []
        }],
        "mrkdwn_in": ["text", "pretext", "fields"],
        "callback_id": "Callback_TOC"
      }]
    }
    utils.sendMessageToSlackURL(actionJSONPayload.response_url, newMessage, "")
  }
  if (actionJSONPayload.callback_id == 'Callback_TOC' ){      
    res.send("action received")
  }
  if (actionJSONPayload.token == process.env.APP_VERIFICATION_TOKEN_WTA){
    dbCollection = 'wta_installs';
  }
  
  if (actionJSONPayload.token !==  process.env.APP_VERIFICATION_TOKEN && actionJSONPayload.token !==  process.env.APP_VERIFICATION_TOKEN_WTA){
	  res.status(403).end("Access forbidden: The token for the slash command doesn't match.")
  }
  else if(actionJSONPayload.type == 'message_action' && actionJSONPayload.callback_id == "set_topic"){
    res.send('');
    console.log("set topic here")
    return databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
      utils.setTopic(token, actionJSONPayload.message.text, actionJSONPayload.channel.id)
    })
    
  }
  else if(actionJSONPayload.type == 'message_action' && actionJSONPayload.callback_id == "block_kit_dialog"){
    res.send('');
    console.log("block kit action dialog")
    var threadTS = ''
    if (actionJSONPayload.message.thread_ts){
      threadTS = actionJSONPayload.message.thread_ts
    }
    return databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
      utils.openDialog(token, actionJSONPayload.trigger_id, "blocks", threadTS)
    })
    
  }
  else if(actionJSONPayload.type == 'message_action' && actionJSONPayload.callback_id == "random_block_kit"){
    res.send('');
    console.log("random block kit")
    var threadTS = ''
    if (actionJSONPayload.message.thread_ts){
      threadTS = actionJSONPayload.message.thread_ts
    }
    utils.createBlockMessage(actionJSONPayload.submission, true).then(function(message){
			databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
			  utils.sendMessageAsBot(token, message, actionJSONPayload.channel.id, threadTS)
		  })
    //   var responseOptions = {}; 
    //   responseOptions.response_type = "in_channel";
    //   responseOptions.replace_original = "true";
    //   console.log("HERE!!");
    //   utils.sendMessageToSlackURL(actionJSONPayload.response_url, message, responseOptions);
    })
    
    
  }
  else if (actionJSONPayload.type == 'message_action' && actionJSONPayload.callback_id == "create_channel"){
    res.send('');
    return databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
			utils.openDialog(token, actionJSONPayload.trigger_id, 1)
    })
  }
  else if (actionJSONPayload.type == 'message_action'){
    res.send('');
    return databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
			utils.openDialog(token, actionJSONPayload.trigger_id, 5)
    })
  }
  else if(actionJSONPayload.type == 'dialog_submission' && actionJSONPayload.callback_id == "create_channel"){
    res.send('');
    console.log("create channel here")
    databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
			utils.createChannel(token, actionJSONPayload.submission.channelName)
    })
  } 
  else if(actionJSONPayload.type == 'dialog_submission' && actionJSONPayload.callback_id == "blocks"){
    res.send('');
    console.log("create custom block message")
    var threadTS = ''
    if (actionJSONPayload.state == "top"){
      var topLevel = true
    }else if(actionJSONPayload.state){
      threadTS = actionJSONPayload.state
    }
    utils.createBlockMessage(actionJSONPayload.submission,"" ,topLevel).then(function(message){
			databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
			  utils.sendMessageAsBot(token, message, actionJSONPayload.channel.id, threadTS)
		  })
    //   var responseOptions = {}; 
    //   responseOptions.response_type = "in_channel";
    //   responseOptions.replace_original = "true";
    //   console.log("HERE!!");
    //   utils.sendMessageToSlackURL(actionJSONPayload.response_url, message, responseOptions);
    })
  }
  else if(actionJSONPayload.type == 'dialog_submission' && actionJSONPayload.callback_id == "filesListDialog"){
    res.send('');
    console.log("Search dialog Files List submitted")
    var submission = actionJSONPayload.submission
    console.log(submission)
    databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
      filesUtils.getFilesFromSlack(token, submission.channelIDSearch, submission.listCount, submission.listPage, submission.tsStart, submission.tsEnd).then(function(filesList){//, count, page, tsStart, tsEnd)
        filesUtils.buildListMessage(filesList).then(function(filesMessage){
          utils.sendMessageAsBot(token, filesMessage, actionJSONPayload.channel.id)
        })
      })
    })
  }
  else if (actionJSONPayload.type == 'block_actions'){
    console.log("in block_actions")
    res.send('').end();
    var message = {}
    var value = ''
    var actionType = actionJSONPayload.actions[0].type
    if (actionType == 'button' ){
      value = actionJSONPayload.actions[0].value
    }
    else if (actionType == 'static_select' || actionType == 'overflow'){
      value = actionJSONPayload.actions[0].selected_option.value
    }
    else if (actionType == 'datepicker'){
      value = actionJSONPayload.actions[0].selected_date
    }
    else if (actionType == 'channels_select'){
      value = actionJSONPayload.actions[0].selected_channel
    }
    else if (actionType == 'users_select'){
      value = actionJSONPayload.actions[0].selected_user
    }
    else if (actionType == 'conversations_select'){
      value = actionJSONPayload.actions[0].selected_conversation
    }
   
    
    message.text = "Rooster's server received the following action request:"
    message.attachments = [{"text": "you selected: " + value}]
    return databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
			utils.sendMessageAsBot(token, message, actionJSONPayload.channel.id)
    })
  }
    
    
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
  
  
  else if (actionJSONPayload.type == 'dialog_submission'){
    res.send('')
    var text = "Dialog or Message Action success"
    if (actionJSONPayload.state){
      text = actionJSONPayload.state
    }
    var message = {
      "attachments": [
        {
          "text": text
        }
      ]
		}
    var responseOptions = {}
    responseOptions.response_type = "in_channel"
    responseOptions.replace_original = "true"
    utils.sendMessageToSlackURL(actionJSONPayload.response_url, message, responseOptions);
    
  }
  
  else if (actionJSONPayload.type == 'dialog_cancellation'){
    res.send('')
    var text = "Dialog canceled"
    if (actionJSONPayload.state){
      text = actionJSONPayload.state
    }
    var message = {
      "attachments": [
        {
          "text": text
        }
      ]
		}
    var responseOptions = {}
    responseOptions.response_type = "in_channel"
    responseOptions.replace_original = "true"
    utils.sendMessageToSlackURL(actionJSONPayload.response_url, message, responseOptions);
    
  }
  else{
    var responseOptions = {} // used as flag for replace, bot, webhook, etc options 
    switch (callbackID){  
      case 'destination_selection':
        //utils.openDialog(actionJSONPayload.trigger_id, 5)
        var menuType = actionJSONPayload.actions[0].value // "users" or "conversations"
        var menuToSend = messageMenuOptions.menuSelector(menuType, "send_card")
        var responseOptions = {}; // used as flag for replace, bot, webhook, etc options
        responseOptions.response_type = "ephemeral"
        responseOptions.replace_original = "true"
        // send ephemeral menu to replace button message 
        utils.sendMessageToSlackURL(actionJSONPayload.response_url, menuToSend, responseOptions)
        res.send('')
        break; 
      case 'send_card':
        if (actionJSONPayload.type == "message_action"){
          var cardDestination = actionJSONPayload.message.user //
        }else{
          var cardDestination = actionJSONPayload.actions[0].selected_options[0].value
        }
        
        var messageContent = {"text": "https://deckofcardsapi.com/static/img/" + utils.randomCardGenerator() + ".png"}
        databaseUtils.getBotToken(actionJSONPayload.team.id).then(function(token){
		       utils.sendMessageAsBot(token, messageContent, cardDestination)
        })
       
        res.send('Card sent')
        break;
      case 'pagination_tests':
        res.send('')
        var method = actionJSONPayload.actions[0].selected_options[0].value
        console.log(actionJSONPayload.actions[0].selected_options[0].value)
        switch(method) {
          case '1':
            method = 'groups.list'
            break;
          case '2':
            method = 'mpim.list'
            break;
          case '3':
            method = 'files.info'
            break;
          case '4':
            method = 'reactions.list'
            break;
          case '5':
            method = 'stars.list'
            break;
          default:
          console.log("shoot")
          res.status(200).end() 
        }
        return databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
          listMethodsHandler.callMethodWithLimitAndCursor(token, method, 2, actionJSONPayload)
        })
        break; 
      case 'advance_cursor':
        res.send('')
        var cursor = actionJSONPayload.actions[0].value
        var method = actionJSONPayload.actions[0].name
        console.log(method)
        return databaseUtils.getToken(actionJSONPayload.team.id, dbCollection).then(function(token){
          listMethodsHandler.callMethodWithLimitAndCursor(token, method, 2, actionJSONPayload, cursor)
        })
        break;            
      
      
      default:
        console.log("shoot")
        res.status(200).end()                                                                                                                                       
    }
  }
  
});

app.post('/slack/events/', JSONParser, (req, res) =>{
	var event = req.body.event
  console.log(event);
	if (req.body.challenge){
		if (req.body.token === process.env.APP_VERIFICATION_TOKEN || req.body.token === process.env.APP_VERIFICATION_TOKEN_WTA){
			res.send(req.body.challenge)
		}else{
			res.status(403).end()
		}
	}else if (event.type === "link_shared"){
    
    var dbCollection = 'app_installs'
  
    //if (req.body.token ==  process.env.APP_VERIFICATION_TOKEN_WTA){
      dbCollection = 'wta_installs'
  //  }
    // rooster.glitch.me links to unfurl some cards because this was in high demand from my millions users 
		res.status(200).end();
    
    
    if (event.links[0].url.includes("file")){
        console.log("file link!")
        var fileID = event.links[0].url.split('=')[1]
        console.log(fileID)
      
        var unfurlMessage = {
          "blocks": [{
              "type": "file",
              "file_id": fileID,
              "source": "remote",
          }]
        }
    
        
        databaseUtils.getToken(req.body.team_id, dbCollection).then(function(token){
          utils.handleFileUnfurling(token, event.channel, event.message_ts, event.links, unfurlMessage).then(function(body){
            utils.sendMessageAsBot(token, {"text":body}, event.channel)
          })
          //utils.openDialogWithState(token, event.trigger_id, "file unfurl") // tested to confirm that it wouldn't work
      })
    }
    
    else{
      var randomCard = {"text": "https://deckofcardsapi.com/static/img/" + utils.randomCardGenerator() + ".png"}
      var unfurlMessage = {"text": "Let\'s shuffle the deck! <@"+event.user+">"}
      databaseUtils.getToken(req.body.team_id, dbCollection).then(function(token){
        utils.handleAppUnfurling(token, event.channel, event.message_ts, event.links, unfurlMessage).then()
      })
      databaseUtils.getBotToken(req.body.team_id).then(function(token){
        utils.sendMessageAsBot(token, randomCard, event.channel)
      })
    }
	}
  else if (event.type.includes("conversation")){
    res.send(event)
  }
	else{
		res.status(200).end();
	}
})


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

app.post('/upload-file', (req, res) =>{
  console.log(req.body.teamID)
  console.log(req.files.uploadFile.mimetype)
  console.log(req.files.uploadFile)
  console.log(req.body.userID)
  console.log(req.body.fileType)
  
  
  var dbCollection = 'wta_installs'
  databaseUtils.getToken(req.body.teamID, dbCollection).then(function(token){
    filesUtils.addFileToSlack(req.files.uploadFile.name, req.body.fileType, token, req.body.userID, req.body.isPreview).then(function(fileData){  
      console.log(fileData)
      res.status(200).send(fileData);
      filesUtils.saveNewFile(req.files.uploadFile, fileData, req.body.teamID, fileData.external_id)
      filesUtils.shareFileInSlack(token, req.body.channelID, fileData.id, req.body.userID)
    })
  })
  
  
})

app.post('/remove-file', (req, res) =>{
  var dbCollection = 'wta_installs'
  databaseUtils.getToken(req.body.teamID, dbCollection).then(function(token){
    filesUtils.removeFileFromSlack(req.body.fileID, token).then(function(removeResponse){  
      console.log("in /remove-file")
      console.log(removeResponse)
      res.status(200).send(removeResponse)
      //filesUtils.removeFileFromDB(req.body.fileID)
     
    })
  })
})

app.post('/update-file', (req, res) =>{
  var dbCollection = 'wta_installs'
  var externalID = req.body.externalID
  var externalURL = req.body.externalURL
  var fileID = req.body.fileID
  var preview = req.body.filePreview
  var title = req.body.fileTitle
  databaseUtils.getToken(req.body.teamID, dbCollection).then(function(token){
    filesUtils.updateFileInSlack(token, externalID, externalURL, fileID, preview, title).then(function(updateResponse){  
      console.log("in /update-file")
      console.log(updateResponse)
      res.status(200).send(updateResponse)
      //filesUtils.removeFileFromDB(req.body.fileID)
     
    })
  })
})



app.listen(process.env.PORT || 3000, () => {
  console.log(`Rooster server launched on port ${process.env.PORT}`)
})
