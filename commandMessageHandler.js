var commmandMessageHandler = {

	help: function(){
		var message = {
      "attachments": [
        {
          "text": "\"/draw-a-card\" to select a user or channel to receive a random card\n\Include https://rooster.glitch.me in a message to receive a random card"
        }
      ]
		}
		return message
	},
	usersAndConversationsButtons: function(callbackOption){
		var message = {
      "text": "Choose where to send a random card",
      "pretext":"this is a lot of pretext this is a lot of pretext this is a lot of pretext this is a lot of pretextthis is a lot of pretext this is a lot of pretextthis is a lot of pretext this is a lot of pretextthis is a lot of pretext this is a lot of pretextthis is a lot of pretext this is a lot of pretextthis is a lot of pretext this is a lot of pretextthis is a lot of pretext this is a lot of pretext",
      "attachments": [
        {
          "fallback": "You are unable to choose a type of message menu",
          "callback_id": "destination_selection"+callbackOption,
          "color": "#70CADB",
          "attachment_type": "default",
          "actions": [
            {
              "name": "conversations",
              "text": "Conversations",
              "type": "button",
              "value": "conversations",
              // "confirm": {
              //   "title": "Are you sure?",
              //   "text": "Wouldn't you prefer a users?",
              //   "ok_text": "Yes",
              //   "dismiss_text": "No"
              // }
            }
          ]
        },   
        {
          "fallback": "You are unable to choose a type of message menu",
          "callback_id": "destination_selection"+callbackOption,
          "color": "#3EB890",
          "attachment_type": "default",
          "actions": [
            {
              "name": "users",
              "text": "Users ",
              "type": "button",
              "value": "users"
            }
          ]
        },   
        // {
        //   "fallback": "You are unable to choose a type of message menu",
        //   "callback_id": "destination_selection"+callbackOption,
        //   "color": "#3EB890",
        //   "attachment_type": "default",
        //   "actions": [
        //     {
        //       "name": "dialog",
        //       "text": "dialog ",
        //       "type": "button",
        //       "value": "dialog"
        //     }
        //   ]
        // }
			]
		}
		return message
	}
}

module.exports = commmandMessageHandler