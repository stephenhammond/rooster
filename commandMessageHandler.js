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
	buttonMenuOptions: function(callbackOption){
		var message = {
      "text": "Choose where to send a random card",
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
              "value": "conversations"
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
        }
			]
		}
		return message
	}
}

module.exports = commmandMessageHandler